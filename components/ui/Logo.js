'use client'

import React from 'react'
import Link from 'next/link'

const Logo = ({ 
  className = '', 
  size = 'md', 
  variant = 'default',
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }

  const getColors = () => {
    switch (variant) {
      case 'white':
        return {
          primary: '#ffffff',
          secondary: '#f3f4f6',
          text: 'text-white'
        }
      case 'dark':
        return {
          primary: '#1f2937',
          secondary: '#374151',
          text: 'text-gray-900'
        }
      default:
        return {
          primary: '#dd6b20',
          secondary: '#ed8936',
          text: 'text-gray-900'
        }
    }
  }

  const colors = getColors()

  return (
    <Link href="/" className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={colors.primary}
            strokeWidth="3"
            className="drop-shadow-sm"
          />
          
          {/* Inner Design - Stylized 'F' and 'E' */}
          <g>
            {/* Letter F */}
            <path
              d="M25 25 L25 75 M25 25 L45 25 M25 50 L40 50"
              stroke={colors.primary}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            
            {/* Letter E */}
            <path
              d="M55 25 L55 75 M55 25 L75 25 M55 50 L70 50 M55 75 L75 75"
              stroke={colors.secondary}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
          
          {/* Decorative Elements */}
          <circle cx="30" cy="15" r="2" fill={colors.primary} opacity="0.6" />
          <circle cx="70" cy="15" r="2" fill={colors.secondary} opacity="0.6" />
          <circle cx="15" cy="50" r="1.5" fill={colors.primary} opacity="0.4" />
          <circle cx="85" cy="50" r="1.5" fill={colors.secondary} opacity="0.4" />
          <circle cx="30" cy="85" r="2" fill={colors.secondary} opacity="0.6" />
          <circle cx="70" cy="85" r="2" fill={colors.primary} opacity="0.6" />
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${textSizeClasses[size]} ${colors.text} leading-tight font-serif`}>
            Funmitan Empire
          </span>
          <span className={`text-xs ${colors.text} opacity-75 uppercase tracking-wider font-medium`}>
            Limited
          </span>
        </div>
      )}
    </Link>
  )
}

export default Logo