// components/comment/CommentForm.js
import React, { useState, useEffect } from "react";
import { useComment } from "@/contexts/CommentContext";
import StarRating from "./StarRating";

const CommentForm = ({ productId }) => {
 const [comment, setComment] = useState("");
 const [rating, setRating] = useState(0);
 const [orders, setOrders] = useState([]);
 const [selectedOrder, setSelectedOrder] = useState("");
 const { addComment, loading, error } = useComment();

 // 獲取可評價的訂單
 useEffect(() => {
   const fetchOrders = async () => {
     try {
       const token = localStorage.getItem("token");
       const response = await fetch(
         `http://localhost:3005/api/comments/product/${productId}/orders`,
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );

       if (!response.ok) {
         throw new Error('Failed to fetch orders');
       }

       const result = await response.json();
       
       if (result.status === 'success' && Array.isArray(result.data)) {
         setOrders(result.data);
       } else {
         setOrders([]);
       }
     } catch (error) {
       console.error("獲取訂單失敗:", error);
       setOrders([]); 
     }
   };

   if (productId) {
     fetchOrders();
   }
 }, [productId]);

 const handleSubmit = async (e) => {
   e.preventDefault();

   // 基本驗證
   if (rating === 0) {
     alert("請選擇評分");
     return;
   }
   if (!comment.trim()) {
     alert("請填寫評價內容");
     return;
   }
   if (!selectedOrder) {
     alert("請選擇要評價的訂單");
     return;
   }

   try {
     await addComment(productId, selectedOrder, comment, rating);
     // 清空表單
     setComment("");
     setRating(0);
     setSelectedOrder("");
     // 顯示成功訊息
     alert('評價成功！');
     // 重新獲取可評價訂單列表
     fetchOrders();
   } catch (error) {
     console.error("提交評價失敗:", error);
     alert(error.message || '評價失敗，請稍後再試');
   }
 };

 // 如果沒有可評價的訂單，不顯示表單
 if (!Array.isArray(orders) || orders.length === 0) {
   return null;
 }

 return (
   <form onSubmit={handleSubmit} className="mb-4">
     {/* 訂單選擇 */}
     <div className="mb-3">
       <label className="form-label fw-bold">選擇訂單</label>
       <select
         className="form-select"
         value={selectedOrder}
         onChange={(e) => setSelectedOrder(e.target.value)}
         required
       >
         <option value="">請選擇訂單...</option>
         {orders.map((order) => (
           <option key={order.id} value={order.id}>
             訂單編號: {order.id} - 購買日期:{" "}
             {new Date(order.created_at).toLocaleDateString()}
           </option>
         ))}
       </select>
     </div>

     <div className="mb-3">
       <label className="form-label fw-bold">評分</label>
       <StarRating
         initialRating={rating}
         onRatingChange={(value) => setRating(value)}
       />
     </div>

     <div className="mb-3">
       <label className="form-label fw-bold">評價內容</label>
       <textarea
         className="form-control"
         rows="3"
         value={comment}
         onChange={(e) => setComment(e.target.value)}
         placeholder="請分享您的使用心得..."
         required
       />
     </div>

     {error && <div className="alert alert-danger mb-3">{error}</div>}

     {/* 提交按鈕 */}
     <div className="d-flex justify-content-end">
       <button type="submit" className="btn btn-custom" disabled={loading}>
         {loading ? "提交中..." : "提交評價"}
       </button>
     </div>
   </form>
 );
};

export default CommentForm;