  const handlePayPalSuccess = async (details, data) => {
    try {
      // Only capture the payment - order will be created by webhook after payment confirmed
      const captureResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://funmitanempire.uk'}/api/v1/payments/capture-order/`, {
        method: 'POST',
        headers: {
          "X-CSRFToken": document.cookie.split("; ").find(row => row.startsWith("csrftoken="))?.split("=")[1] || "",
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          paypal_order_id: data.orderID,
          shipping_info: formData
        })
      })

      if (captureResponse.ok) {
        const captureResult = await captureResponse.json()
        // Redirect to success page
        router.push(`/checkout/success?order=${captureResult.order_number}`)
      } else {
        throw new Error('Payment capture failed')
      }
    } catch (error) {
      console.error('PayPal payment error:', error)
      alert('Payment failed. Please try again.')
    }
  }
