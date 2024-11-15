// pages/forum/[id].js
import React, { useState, useEffect } from 'react'
import { Container, Card, Button, Form } from 'react-bootstrap'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { FaEdit, FaTrash, FaReply } from 'react-icons/fa'
import { toast } from 'react-toastify'
import moment from 'moment'
import 'moment/locale/zh-tw'
import DOMPurify from 'dompurify'
import dynamic from 'next/dynamic'
import Swal from 'sweetalert2'

// 動態載入編輯器，避免 SSR 問題
const Editor = dynamic(
  () => import('@/components/forum/Editor'),
  { ssr: false }
)

export default function PostDetail() {
  const router = useRouter()
  const { id } = router.query
  const { user, isAuthenticated } = useAuth()
  const [post, setPost] = useState(null)
  const [replies, setReplies] = useState([])
  const [loading, setLoading] = useState(true)
  const [replyContent, setReplyContent] = useState('')
  const [showReplyEditor, setShowReplyEditor] = useState(false)

  // 載入文章與回覆
  const fetchPost = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/posts/${id}`)
      const data = await response.json()

      if (response.ok) {
        setPost(data.data.post)
        setReplies(data.data.replies)
      } else {
        throw new Error(data.message || '載入文章失敗')
      }
    } catch (error) {
      console.error('載入文章失敗:', error)
      toast.error('載入文章失敗')
      router.push('/forum')
    } finally {
      setLoading(false)
    }
  }

  // 新增回覆
  const handleReply = async () => {
    if (!replyContent.trim()) {
      toast.warning('請輸入回覆內容')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/forum/posts/${id}/replies`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ content: replyContent })
        }
      )

      const data = await response.json()

      if (response.ok) {
        toast.success('回覆成功')
        setReplyContent('')
        setShowReplyEditor(false)
        fetchPost() // 重新載入文章與回覆
      } else {
        throw new Error(data.message || '回覆失敗')
      }
    } catch (error) {
      console.error('回覆失敗:', error)
      toast.error('回覆失敗')
    }
  }

  // 刪除文章
  const handleDeletePost = async () => {
    try {
      const result = await Swal.fire({
        title: '確定要刪除文章嗎？',
        text: '此操作無法復原',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: '確定刪除',
        cancelButtonText: '取消'
      })

      if (result.isConfirmed) {
        const token = localStorage.getItem('token')
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/forum/posts/${id}`,
          {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        )

        const data = await response.json()

        if (response.ok) {
          toast.success('文章已刪除')
          router.push('/forum')
        } else {
          throw new Error(data.message || '刪除文章失敗')
        }
      }
    } catch (error) {
      console.error('刪除文章失敗:', error)
      toast.error('刪除文章失敗')
    }
  }

  // 刪除回覆
  const handleDeleteReply = async (replyId) => {
    try {
      const result = await Swal.fire({
        title: '確定要刪除回覆嗎？',
        text: '此操作無法復原',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: '確定刪除',
        cancelButtonText: '取消'
      })

      if (result.isConfirmed) {
        const token = localStorage.getItem('token')
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/forum/replies/${replyId}`,
          {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        )

        const data = await response.json()

        if (response.ok) {
          toast.success('回覆已刪除')
          fetchPost() // 重新載入文章與回覆
        } else {
          throw new Error(data.message || '刪除回覆失敗')
        }
      }
    } catch (error) {
      console.error('刪除回覆失敗:', error)
      toast.error('刪除回覆失敗')
    }
  }

  useEffect(() => {
    if (id) {
      fetchPost()
    }
  }, [id])

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!post) {
    return null
  }

  return (
    <Container className="py-4">
      {/* 文章內容 */}
      <Card className="mb-4">
        <Card.Header className="bg-white">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">{post.title}</h4>
            {isAuthenticated() && user?.id === post.user_id && (
              <div>
                <Link 
                  href={`/forum/edit?id=${post.id}`}
                  className="btn btn-outline-primary btn-sm me-2"
                >
                  <FaEdit /> 編輯
                </Link>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={handleDeletePost}
                >
                  <FaTrash /> 刪除
                </Button>
              </div>
            )}
          </div>
        </Card.Header>
        <Card.Body>
          {/* 作者資訊 */}
          <div className="d-flex align-items-center mb-3">
            <img
              src={post.author_avatar || '/default-avatar.png'}
              alt={post.author_name}
              className="rounded-circle"
              width="40"
              height="40"
            />
            <div className="ms-2">
              <div>{post.author_name}</div>
              <small className="text-muted">
                {moment(post.created_at).format('YYYY/MM/DD HH:mm')}
              </small>
            </div>
          </div>
          {/* 文章內容 */}
          <div 
            className="post-content"
            dangerouslySetInnerHTML={{ 
              __html: DOMPurify.sanitize(post.content) 
            }}
          />
        </Card.Body>
      </Card>

      {/* 回覆區 */}
      <div className="mb-4">
        <h5 className="mb-3">
          回覆 ({replies.length})
          {isAuthenticated() && !showReplyEditor && (
            <Button
              variant="custom"
              size="sm"
              className="ms-2"
              onClick={() => setShowReplyEditor(true)}
            >
              <FaReply /> 撰寫回覆
            </Button>
          )}
        </h5>

        {/* 回覆編輯器 */}
        {showReplyEditor && (
          <Card className="mb-3">
            <Card.Body>
              <Editor
                editorState={replyContent}
                onEditorStateChange={setReplyContent}
                placeholder="寫下你的回覆..."
              />
              <div className="mt-3 d-flex justify-content-end gap-2">
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setShowReplyEditor(false)
                    setReplyContent('')
                  }}
                >
                  取消
                </Button>
                <Button variant="custom" onClick={handleReply}>
                  發表回覆
                </Button>
              </div>
            </Card.Body>
          </Card>
        )}

        {/* 回覆列表 */}
        {replies.map((reply) => (
          <Card key={reply.id} className="mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={reply.author_avatar || '/default-avatar.png'}
                    alt={reply.author_name}
                    className="rounded-circle"
                    width="32"
                    height="32"
                  />
                  <div className="ms-2">
                    <div>{reply.author_name}</div>
                    <small className="text-muted">
                      {moment(reply.created_at).format('YYYY/MM/DD HH:mm')}
                    </small>
                  </div>
                </div>
                {isAuthenticated() && user?.id === reply.user_id && (
                  <Button
                    variant="link"
                    className="text-danger p-0"
                    onClick={() => handleDeleteReply(reply.id)}
                  >
                    <FaTrash />
                  </Button>
                )}
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(reply.content)
                }}
              />
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  )
}