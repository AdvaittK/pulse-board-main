"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  role: "user" | "admin"
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<void>
}

// Mock user data for frontend showcase
const MOCK_ADMIN_USER: User = {
  id: "admin-user-1",
  email: "admin@example.com",
  firstName: "Admin",
  lastName: "User",
  phone: "+1234567890",
  avatar: "/placeholder-user.jpg",
  role: "admin"
}

const MOCK_REGULAR_USER: User = {
  id: "regular-user-1",
  email: "user@example.com",
  firstName: "Regular",
  lastName: "User",
  avatar: "/placeholder-user.jpg",
  role: "user"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // For showcase purposes, check if a user choice is stored in localStorage
    const storedUser = localStorage.getItem("showcase_user")
    
    // Default to admin for the showcase
    if (storedUser === "regular") {
      setUser(MOCK_REGULAR_USER)
    } else {
      setUser(MOCK_ADMIN_USER)
    }
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // For showcase, just check the email to determine which mock user to use
    if (email.includes("admin")) {
      localStorage.setItem("showcase_user", "admin")
      setUser(MOCK_ADMIN_USER)
    } else {
      localStorage.setItem("showcase_user", "regular")
      setUser(MOCK_REGULAR_USER)
    }
    
    setIsLoading(false)
  }

  const logout = () => {
    localStorage.removeItem("showcase_user")
    setUser(null)
  }
  
  const updateProfile = async (userData: Partial<User>) => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Update the user data
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
    }
    
    setIsLoading(false)
    // No return value needed as the function should resolve to void
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login,
        logout,
        updateProfile 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
