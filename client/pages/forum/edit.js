// pages/forum/edit.js
import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Card } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'

// 動態載入編輯器，避免 SSR 問題
const Editor = dynamic(
  () => import('@/components/forum/Editor'),
  { ssr: false }
)

export default function PostEdit() {
  const router = useRouter()
  const { id } = router.query
  const { isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [validated, setValidated] = useState(false)

  // 檢查登入狀態
  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      toast.error('請先登入')
      router.push('/auth/login')
    }
  }, [isAuthenticated, loading])

  // 如果是編輯模式，載入文章內容
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return

      try {
        setLoading(true)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/forum/posts/${id}`
        )
        const data = await response.json()

        if (response.ok) {
          setTitle(data.data.post.title)
          setContent(data.data.post.content)
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

    if (id) {
      fetchPost()
    }
  }, [id])

  // 表單提交處理
  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    
    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    if (!content) {
      toast.warning('請輸入文章內容')
      return
    }

    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const url = id 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/forum/posts/${id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/forum/posts`
      
      const response = await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(id ? '文章更新成功' : '發文成功')
        router.push(id ? `/forum/${id}` : '/forum')
      } else {
        throw new Error(data.message || (id ? '更新文章失敗' : '發文失敗'))
      }
    } catch (error) {
      console.error(id ? '更新文章失敗:' : '發文失敗:', error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="mb-4">{id ? '編輯文章' : '發表新文章'}</h2>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* 標題 */}
            <Form.Group className="mb-3">
              <Form.Label>標題</Form.Label>
              <Form.Control
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="請輸入文章標題"
                maxLength={100}
              />
              <Form.Control.Feedback type="invalid">
                請輸入文章標題
              </Form.Control.Feedback>
            </Form.Group>

            {/* 內容 */}
            <Form.Group className="mb-4">
              <Form.Label>內容</Form.Label>
              <Editor
                editorState={content}
                onEditorStateChange={setContent}
                placeholder="來分享些什麼吧..."
              />
            </Form.Group>

            {/* 按鈕區 */}
            <div className="d-flex gap-2 justify-content-end">
              <Button
                variant="outline-secondary"
                onClick={() => router.back()}
                disabled={loading}
              >
                取消
              </Button>
              <Button
                variant="custom"
                type="submit"
                disabled={loading}
              >
                {loading ? '處理中...' : (id ? '更新文章' : '發表文章')}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}