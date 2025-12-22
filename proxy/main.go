package main

import (
	"io"
	"log"
	"net/http"
)

// 默认代理监听端口
const proxyPort = "7895"

func main() {
	// 监听本地所有网络接口的指定端口
	addr := ":" + proxyPort
	log.Printf("Go HTTP 代理服务器启动，监听地址: %s", addr)

	// 代理处理函数
	handler := func(w http.ResponseWriter, r *http.Request) {
		// 1. 记录请求信息
		log.Printf("收到请求: %s %s 来自: %s", r.Method, r.URL.Host, r.RemoteAddr)

		// 2. 移除客户端发送的代理相关头部（可选，但推荐）
		r.RequestURI = "" // 必须清空此字段，否则 Go 的 RoundTrip 会发送它

		// 移除代理专用的 Header
		r.Header.Del("Proxy-Connection")
		r.Header.Del("Proxy-Authenticate")
		r.Header.Del("Proxy-Authorization")

		// 3. 创建一个转发请求 (基于原始请求)
		// 如果原始请求是相对路径，需要修复为绝对路径
		// 代理模式下的请求 URL 是完整的，如 http://example.com/path

		// 4. 使用默认 HTTP 客户端转发请求
		client := &http.Client{}
		resp, err := client.Do(r)

		if err != nil {
			http.Error(w, "代理转发失败: "+err.Error(), http.StatusBadGateway)
			return
		}
		defer resp.Body.Close()

		// 5. 复制响应头部到客户端
		for key, values := range resp.Header {
			for _, value := range values {
				w.Header().Add(key, value)
			}
		}

		// 6. 设置响应状态码
		w.WriteHeader(resp.StatusCode)

		// 7. 复制响应体到客户端
		io.Copy(w, resp.Body)
	}

	// 启动 HTTP 服务器
	err := http.ListenAndServe(addr, http.HandlerFunc(handler))
	if err != nil {
		log.Fatalf("服务器启动失败: %v", err)
	}
}

// 注意：这是一个最简 HTTP 代理，不支持 HTTPS（CONNECT 方法）和高级路由。
// 仅用于演示接收请求和转发的核心概念。
