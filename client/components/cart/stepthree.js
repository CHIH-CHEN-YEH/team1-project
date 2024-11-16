// components/cart/StepThree.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { useRouter } from "next/router";
import { useCart } from "@/contexts/CartContext";
import Swal from "sweetalert2";
import styles from "@/styles/cart.module.css";

const StepThree = ({
  setstepType,
  orderName,
  orderPhone,
  orderAddress,
  discountPrice,
  discountAmount,
  cartCouponId,
  cartOriginDtl,
  cartProducDtl,
}) => {
  const router = useRouter();
  const { fetchCartCount } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [testCardInfo, setTestCardInfo] = useState(null);

  // 取得測試用信用卡資訊
  useEffect(() => {
    const fetchTestCardInfo = async () => {
      try {
        const response = await fetch(
          "http://localhost:3005/api/ecpay/test-credit-card"
        );
        const data = await response.json();
        setTestCardInfo(data);
      } catch (error) {
        console.error("取得測試卡號失敗:", error);
      }
    };
    fetchTestCardInfo();
  }, []);

  const calculateTotalAmount = () => {
    return cartOriginDtl.reduce((total, item) => {
      if (item.type === "rental") {
        return (
          total +
          item.deposit * item.quantity +
          item.rental_fee * (item.rental_days || 3) * item.quantity
        );
      } else {
        return total + item.price * item.quantity;
      }
    }, 0);
  };

  const calculateSubtotals = () => {
    const subtotals = {
      sale: 0,
      rental: {
        deposit: 0,
        rental: 0,
      },
    };

    cartOriginDtl.forEach((item) => {
      if (item.type === "sale") {
        subtotals.sale += item.price * item.quantity;
      } else {
        subtotals.rental.deposit += item.deposit * item.quantity;
        subtotals.rental.rental +=
          item.rental_fee * (item.rental_days || 3) * item.quantity;
      }
    });

    return subtotals;
  };

  // 處理綠界支付
  const handleEcpayPayment = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/ecpay/create-payment/${orderId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "建立支付失敗");
      }

      // 建立表單並提交到綠界
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.paymentUrl;

      Object.entries(data.ecpayData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("處理金流錯誤:", error);
      Swal.fire({
        icon: "error",
        title: "金流處理失敗",
        text: error.message || "請稍後再試",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  const handleConfirmOrder = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("請先登入");
      }

      const orderData = {
        recipient_name: orderName,
        recipient_phone: orderPhone,
        recipient_address: orderAddress,
        total_amount: calculateTotalAmount(),
        discount_amount: discountAmount,
        final_amount: discountPrice,
        coupon_id: cartCouponId,
        payment_method: paymentMethod,
        items: cartOriginDtl.map((item) => ({
          product_id: item.product_id || item.id,
          type: item.type,
          quantity: item.quantity,
          price: item.type === "rental" ? item.rental_fee : item.price,
          ...(item.type === "rental" && {
            deposit: item.deposit,
            rental_days: item.rental_days || 3,
          }),
        })),
      };

      const response = await fetch("http://localhost:3005/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "建立訂單失敗");
      }

      // 清空購物車
      const clearCartResponse = await fetch(
        "http://localhost:3005/api/cart/clear",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!clearCartResponse.ok) {
        console.error("清空購物車失敗");
      }

      await fetchCartCount();

      // 根據付款方式處理
      if (paymentMethod === "credit_card") {
        // 導向綠界支付
        await handleEcpayPayment(data.orderId);
      } else {
        // 銀行轉帳
        await Swal.fire({
          icon: "success",
          title: "訂單建立成功！",
          text: "請依照邀請信內容完成付款",
          iconColor: "#40CBCE",
          confirmButtonText: "查看訂單",
          confirmButtonColor: "#40CBCE",
        });
        router.push(`/member/orders/${data.orderId}`);
      }
    } catch (error) {
      console.error("訂單處理錯誤:", error);
      await Swal.fire({
        icon: "error",
        title: "訂單建立失敗",
        text: error.message || "系統錯誤，請稍後再試",
        confirmButtonText: "確定",
        confirmButtonColor: "#dc3545",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotals = calculateSubtotals();

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-4">訂單資訊確認</h5>

              <div className="mb-4">
                <h6 className="text-muted mb-3">收件資訊</h6>
                <p className="mb-1">收件人：{orderName}</p>
                <p className="mb-1">聯絡電話：{orderPhone}</p>
                <p className="mb-0">收件地址：{orderAddress}</p>
              </div>

              <hr />

              <div className="mb-4">
                {cartOriginDtl.filter((item) => item.type === "sale").length >
                  0 && (
                  <>
                    <h6 className="text-muted mb-3">購買商品</h6>
                    {cartOriginDtl
                      .filter((item) => item.type === "sale")
                      .map((item, index) => (
                        <div
                          key={index}
                          className="d-flex align-items-center mb-3"
                        >
                          <img
                            src={`http://localhost:3005/productImages/${item.product_id}/${item.product_id}-1.jpg`}
                            alt={item.name}
                            className="rounded"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.target.src =
                                "http://localhost:3005/productImages/default-product.png";
                            }}
                          />
                          <div className="ms-3 flex-grow-1">
                            <div className="d-flex justify-content-between">
                              <h6 className="mb-1">{item.name}</h6>
                              <span className="text-muted">
                                x{item.quantity}
                              </span>
                            </div>
                            <p className="mb-0 text-muted">
                              NT$ {item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    <div className="text-end mb-3">
                      <span className="text-muted">
                        小計：NT$ {subtotals.sale.toLocaleString()}
                      </span>
                    </div>
                  </>
                )}

                {cartOriginDtl.filter((item) => item.type === "rental").length >
                  0 && (
                  <>
                    <h6 className="text-muted mb-3">租借商品</h6>
                    {cartOriginDtl
                      .filter((item) => item.type === "rental")
                      .map((item, index) => (
                        <div
                          key={index}
                          className="d-flex align-items-center mb-3"
                        >
                          <img
                            src={`http://localhost:3005/productImages/${item.product_id}/${item.product_id}-1.jpg`}
                            alt={item.name}
                            className="rounded"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.target.src =
                                "http://localhost:3005/productImages/default-product.png";
                            }}
                          />
                          <div className="ms-3 flex-grow-1">
                            <div className="d-flex justify-content-between">
                              <h6 className="mb-1">{item.name}</h6>
                              <span className="text-muted">
                                x{item.quantity}
                              </span>
                            </div>
                            <p className="mb-0 text-muted">
                              租期：{item.rental_days || 3}天<br />
                              租金：NT$ {item.rental_fee.toLocaleString()} /天
                              <br />
                              押金：NT$ {item.deposit.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    <div className="text-end mb-3">
                      <span className="text-muted">
                        租金小計：NT$ {subtotals.rental.rental.toLocaleString()}
                        <br />
                        押金小計：NT${" "}
                        {subtotals.rental.deposit.toLocaleString()}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <hr />

              <div className="mb-4">
                <h6 className="text-muted mb-3">付款方式</h6>
                <Form>
                  <Form.Check
                    type="radio"
                    id="credit_card"
                    name="payment_method"
                    label="信用卡付款"
                    checked={paymentMethod === "credit_card"}
                    onChange={() => setPaymentMethod("credit_card")}
                    className="mb-2"
                  />
                  {paymentMethod === "credit_card" && testCardInfo && (
                    <Alert variant="info" className="mt-2 mb-3">
                      <small>
                        測試用信用卡資訊：
                        <br />
                        卡號：{testCardInfo.cardNumber}
                        <br />
                        到期日：{testCardInfo.expiryDate}
                        <br />
                        安全碼：{testCardInfo.cvv}
                      </small>
                    </Alert>
                  )}
                  <Form.Check
                    type="radio"
                    id="transfer"
                    name="payment_method"
                    label="銀行轉帳"
                    checked={paymentMethod === "transfer"}
                    onChange={() => setPaymentMethod("transfer")}
                  />
                </Form>
              </div>

              <div className="bg-light p-3 rounded">
                <div className="d-flex justify-content-between mb-2">
                  <span>商品總金額</span>
                  <span>
                    NT${" "}
                    {(
                      subtotals.sale +
                      subtotals.rental.rental +
                      subtotals.rental.deposit
                    ).toLocaleString()}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="d-flex justify-content-between mb-2 text-danger">
                    <span>優惠折抵</span>
                    <span>-NT$ {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <hr className="my-2" />
                <div className="d-flex justify-content-between fw-bold">
                  <span>應付總額</span>
                  <span className="text-primary">
                    NT$ {discountPrice.toLocaleString()}
                  </span>
                </div>
                {subtotals.rental.deposit > 0 && (
                  <div className="small text-muted mt-2">
                    *含押金 NT$ {subtotals.rental.deposit.toLocaleString()}
                    ，將於商品歸還後退還
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>

          <div className="d-flex justify-content-between gap-3 mb-5">
            <Button
              variant="outline-secondary"
              onClick={() => setstepType(2)}
              className="px-4"
              disabled={isProcessing}
            >
              返回修改
            </Button>
            <Button
              variant="custom"
              onClick={handleConfirmOrder}
              className={`px-4 ${styles.checkoutButton} ${styles.BBBtn}`}
              disabled={isProcessing}
            >
              {isProcessing ? "處理中..." : "確認下單"}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default StepThree;
