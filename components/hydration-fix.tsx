"use client"

import { useEffect } from "react"

export function HydrationFix() {
  useEffect(() => {
    // Remove any attributes added by browser extensions that might cause hydration mismatches
    const removeExtensionAttributes = () => {
      const elements = document.querySelectorAll('[bis_skin_checked]')
      elements.forEach(element => {
        element.removeAttribute('bis_skin_checked')
      })
    }

    // Run immediately and after multiple delays to catch extensions that modify DOM later
    removeExtensionAttributes()
    
    // Set up multiple timeouts to catch extensions that modify DOM at different times
    const timeoutIds = [
      setTimeout(removeExtensionAttributes, 100),
      setTimeout(removeExtensionAttributes, 500),
      setTimeout(removeExtensionAttributes, 1000),
      setTimeout(removeExtensionAttributes, 2000)
    ]

    // Set up a MutationObserver to watch for DOM changes and remove attributes immediately
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'bis_skin_checked') {
          const target = mutation.target as Element
          if (target.hasAttribute('bis_skin_checked')) {
            target.removeAttribute('bis_skin_checked')
          }
        }
        if (mutation.type === 'childList') {
          // Check new nodes for the attribute
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              if (element.hasAttribute('bis_skin_checked')) {
                element.removeAttribute('bis_skin_checked')
              }
              // Also check children
              const children = element.querySelectorAll('[bis_skin_checked]')
              children.forEach(child => child.removeAttribute('bis_skin_checked'))
            }
          })
        }
      })
    })

    // Start observing
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['bis_skin_checked']
    })

    return () => {
      timeoutIds.forEach(id => clearTimeout(id))
      observer.disconnect()
    }
  }, [])

  return null
}
