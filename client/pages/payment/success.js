// pages/payment/success.js
import React, { useEffect, useState, useRef } from "react";
import { Container, Card, Button, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import Head from "next/head";
import Swal from "sweetalert2";
import { CheckCircle } from "lucide-react";
import html2canvas from "html2canvas";
import styles from "@/styles/payment.module.css";

export default function PaymentSuccess() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const orderContentRef = useRef(null);

  // 取得訂單詳細資料
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // 從 URL 取得訂單編號
        const { orderId } = router.query;
        if (!orderId) return;
    
        // 先取得訂單詳情
        const response = await fetch(
          `http://localhost:3005/api/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
    
        if (!response.ok) throw new Error('訂單載入失敗');
    
        const data = await response.json();
    
        // 只在訂單未付款時才更新狀態
        if (data.payment_status === 0) {
          const updateResponse = await fetch(
            `http://localhost:3005/api/orders/${orderId}/complete`,
            {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
    
          if (!updateResponse.ok) {
            console.error('更新訂單狀態失敗');
          } else {
            // 重新取得更新後的訂單資料
            const refreshResponse = await fetch(
              `http://localhost:3005/api/orders/${orderId}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              }
            );
            
            if (refreshResponse.ok) {
              const refreshData = await refreshResponse.json();
              setOrderDetails(refreshData);
              return;
            }
          }
        }
    
        // 如果沒有更新或更新後重新取得失敗，使用原本的資料
        setOrderDetails(data);
      } catch (error) {
        console.error('訂單載入錯誤:', error);
        Swal.fire({
          icon: 'error',
          title: '訂單載入失敗',
          text: error.message || '無法取得訂單詳細資料',
          confirmButtonColor: '#40CBCE',
        });
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      fetchOrderDetails();
    }
  }, [router.isReady, router.query]);

  // 儲存為圖片
  const handleSaveAsImage = async () => {
    try {
      // 顯示載入中
      Swal.fire({
        title: "準備下載中...",
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
      });

      const element = orderContentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // 提高圖片品質
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      // 創建下載連結
      const link = document.createElement("a");
      link.download = `order-${orderDetails.id}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      // 關閉載入提示
      Swal.close();

      // 顯示成功訊息
      Swal.fire({
        icon: "success",
        title: "訂單已儲存",
        text: "您可以在下載資料夾中找到訂單圖片",
        confirmButtonColor: "#40CBCE",
      });
    } catch (error) {
      console.error("圖片儲存錯誤:", error);
      Swal.fire({
        icon: "error",
        title: "儲存失敗",
        text: "請稍後再試",
        confirmButtonColor: "#40CBCE",
      });
    }
  };

  // 完成訂單
  const handleComplete = () => {
    Swal.fire({
      icon: "success",
      title: "感謝您的購買！",
      text: "期待您再次光臨",
      confirmButtonColor: "#40CBCE",
    }).then(() => {
      router.push("/auth/user?tab=orders");
    });
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (!orderDetails) {
    return (
      <Container className="py-5 text-center">
        <h3>找不到訂單資料</h3>
      </Container>
    );
  }

  return (
    <>
    <Head>
      <title>付款成功 | Pertho</title>
    </Head>
    <Container className="py-5">
      <Card className="border-0 shadow-sm">
        <Card.Body className="py-5">
          <div className="p-5" ref={orderContentRef}>
            {/* 成功圖示 */}
            <div className={`${styles.successIcon} mb-4 text-center`}>
              <CheckCircle size={60} color="#40CBCE" />
            </div>

            <h2 className="text-center mb-4">付款成功！</h2>
            <p className="text-center text-muted mb-4">
              感謝您的購買，您的訂單已確認付款完成
            </p>

            {/* 訂單資訊 */}
            <div className="mb-4">
              <h5 className="mb-3">訂單資訊</h5>
              <Table responsive className="mt-3">
                <tbody>
                  <tr>
                    <td className="text-muted">訂單編號</td>
                    <td>{orderDetails?.id}</td>
                  </tr>
                  <tr>
                    <td className="text-muted">訂購日期</td>
                    <td>
                      {new Date(orderDetails?.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-muted">收件人</td>
                    <td>{orderDetails?.recipient_name}</td>
                  </tr>
                  <tr>
                    <td className="text-muted">聯絡電話</td>
                    <td>{orderDetails?.recipient_phone}</td>
                  </tr>
                  <tr>
                    <td className="text-muted">收件方式</td>
                    <td>
                      {orderDetails?.delivery_method === "711"
                        ? "7-11 取貨"
                        : "宅配到府"}
                    </td>
                  </tr>
                  {orderDetails?.delivery_method === "711" ? (
                    <>
                      <tr>
                        <td className="text-muted">門市名稱</td>
                        <td>{orderDetails?.store_name}</td>
                      </tr>
                      <tr>
                        <td className="text-muted">門市地址</td>
                        <td>{orderDetails?.recipient_address}</td>
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td className="text-muted">收件地址</td>
                      <td>{orderDetails?.recipient_address}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            {/* 商品明細 */}
            <div className="mb-4">
              <h5 className="mb-3">商品明細</h5>
              <Table responsive>
                <thead>
                  <tr>
                    <th>商品名稱</th>
                    <th>類型</th>
                    <th>數量</th>
                    <th>單價</th>
                    <th>小計</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails?.items?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>
                        {item.type === "rental"
                          ? `租借(${item.rental_days}天)`
                          : "購買"}
                      </td>
                      <td>{item.quantity}</td>
                      <td>
                        {item.type === "rental" ? (
                          <>
                            租金：NT$ {item.price?.toLocaleString()}/天
                            <br />
                            押金：NT$ {item.deposit?.toLocaleString()}
                          </>
                        ) : (
                          `NT$ ${item.price?.toLocaleString()}`
                        )}
                      </td>
                      <td>
                        {item.type === "rental" ? (
                          <>
                            NT${" "}
                            {(
                              item.quantity * (item.price * item.rental_days) +
                              item.quantity * item.deposit
                            ).toLocaleString()}
                            <div className="small text-muted">
                              (租金:{" "}
                              {(
                                item.quantity *
                                (item.price * item.rental_days)
                              ).toLocaleString()}{" "}
                              + 押金:{" "}
                              {(item.quantity * item.deposit).toLocaleString()})
                            </div>
                          </>
                        ) : (
                          `NT$ ${(item.price * item.quantity).toLocaleString()}`
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* 金額總計 */}
            <div className="text-end mb-4">
              <p>
                商品總額：NT$ {orderDetails?.total_amount?.toLocaleString()}
              </p>
              <p>
                優惠折抵：NT$ {orderDetails?.discount_amount?.toLocaleString()}
              </p>
              <h5>
                應付總額：NT$ {orderDetails?.final_amount?.toLocaleString()}
              </h5>
              {orderDetails?.items?.some((item) => item.type === "rental") && (
                <div className="small text-muted mt-2">
                  *含押金，將於商品歸還後退還
                </div>
              )}
            </div>
          </div>

          {/* 按鈕區 */}
          <div className="d-flex justify-content-center gap-3">
            <Button
              variant="outline-secondary"
              onClick={handleSaveAsImage}
              className={styles.downloadBtn}
            >
              儲存訂單
            </Button>
            <Button
              variant="custom"
              onClick={handleComplete}
              className={styles.completeBtn}
            >
              完成
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
}