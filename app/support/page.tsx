'use client';
import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaClock, FaShippingFast, FaUndo, FaCreditCard } from 'react-icons/fa';

const SupportPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    orderNumber: '',
    // Dynamic fields
    returnReason: '',
    orderDate: '',
    productName: '',
    defectDescription: '',
    urgencyLevel: '',
    phoneNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Helper function to get dynamic fields based on subject
  const getDynamicFields = () => {
    switch (formData.subject) {
      case 'Return/Refund':
        return ['orderNumber', 'orderDate', 'returnReason', 'productName'];
      case 'Order Inquiry':
        return ['orderNumber', 'orderDate', 'urgencyLevel'];
      case 'Product Question':
        return ['productName', 'orderNumber'];
      case 'Technical Issue':
        return ['urgencyLevel', 'defectDescription'];
      case 'Shipping':
        return ['orderNumber', 'orderDate', 'urgencyLevel'];
      default:
        return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          orderNumber: '',
          returnReason: '',
          orderDate: '',
          productName: '',
          defectDescription: '',
          urgencyLevel: '',
          phoneNumber: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Customer Support</h1>
          <p className="text-xl text-center text-gray-300">We&apos;re here to help you with any questions or concerns</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">Select a subject</option>
                <option value="Order Inquiry">Order Inquiry</option>
                <option value="Return/Refund">Return/Refund</option>
                <option value="Shipping">Shipping Question</option>
                <option value="Product Question">Product Question</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Dynamic Fields Based on Subject */}
            {getDynamicFields().includes('orderNumber') && (
              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Order Number *
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  name="orderNumber"
                  required
                  value={formData.orderNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Order #12345"
                />
              </div>
            )}

            {getDynamicFields().includes('orderDate') && (
              <div>
                <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Order Date *
                </label>
                <input
                  type="date"
                  id="orderDate"
                  name="orderDate"
                  required
                  value={formData.orderDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            )}

            {getDynamicFields().includes('returnReason') && (
              <div>
                <label htmlFor="returnReason" className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Return *
                </label>
                <select
                  id="returnReason"
                  name="returnReason"
                  required
                  value={formData.returnReason}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Select a reason</option>
                  <option value="Wrong Size">Wrong Size</option>
                  <option value="Defective Item">Defective Item</option>
                  <option value="Not as Described">Not as Described</option>
                  <option value="Changed Mind">Changed Mind</option>
                  <option value="Quality Issues">Quality Issues</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            )}

            {getDynamicFields().includes('productName') && (
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  required
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter the product name"
                />
              </div>
            )}

            {getDynamicFields().includes('urgencyLevel') && (
              <div>
                <label htmlFor="urgencyLevel" className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level *
                </label>
                <select
                  id="urgencyLevel"
                  name="urgencyLevel"
                  required
                  value={formData.urgencyLevel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Select urgency level</option>
                  <option value="Low">Low - Response within 48 hours</option>
                  <option value="Medium">Medium - Response within 24 hours</option>
                  <option value="High">High - Response within 4 hours</option>
                  <option value="Urgent">Urgent - Immediate response needed</option>
                </select>
              </div>
            )}

            {getDynamicFields().includes('defectDescription') && (
              <div>
                <label htmlFor="defectDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Describe the Issue *
                </label>
                <textarea
                  id="defectDescription"
                  name="defectDescription"
                  required
                  rows={4}
                  value={formData.defectDescription}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                  placeholder="Please describe the technical issue or defect in detail..."
                />
              </div>
            )}

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                placeholder="Please describe your question or concern in detail..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                Thank you! Your message has been sent successfully. We&apos;ll get back to you within 24 hours.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                Sorry, there was an error sending your message. Please try again or contact us directly.
              </div>
            )}
              </form>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Get in Touch</h2>
                        <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaPhone className="text-pink-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600 text-sm">00 44 7782 824994</p>
                    <p className="text-xs text-gray-500">Mon-Fri, 9AM-6PM GMT</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <FaEnvelope className="text-pink-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600 text-sm">info@pink-malibu.com</p>
                    <p className="text-xs text-gray-500">24 hour response</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FaClock className="text-pink-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-gray-600 text-sm">Mon-Fri: 9AM-6PM GMT</p>
                    <p className="text-gray-600 text-sm">Weekend: 10AM-4PM GMT</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Policy Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Quick Info</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FaUndo className="text-pink-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">30-Day Returns</p>
                    <p className="text-gray-600 text-xs">Free return shipping</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaShippingFast className="text-pink-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Fast Shipping</p>
                    <p className="text-gray-600 text-xs">1-2 days express delivery</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCreditCard className="text-pink-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Secure Payments</p>
                    <p className="text-gray-600 text-xs">All major cards accepted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Return & Refund Policy */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Return & Refund Policy</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-4">
              <FaUndo className="text-pink-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2 text-gray-900">30-Day Returns</h3>
                <p className="text-gray-600 text-sm">
                  We offer a 30-day return window from the date of delivery. Items must be in original condition with tags attached.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaShippingFast className="text-pink-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2 text-gray-900">Free Return Shipping</h3>
                <p className="text-gray-600 text-sm">
                  We provide free return shipping labels for all returns within the UK. International return costs may apply.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaCreditCard className="text-pink-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2 text-gray-900">Refund Process</h3>
                <p className="text-gray-600 text-sm">
                  Refunds are processed within 5-7 business days after we receive your return. Original payment method will be credited.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mt-6">
            <h4 className="font-semibold mb-3 text-gray-900">Return Conditions:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Items must be unworn and in original condition</li>
                <li>• Original tags must be attached</li>
                <li>• Items must be returned in original packaging</li>
              </ul>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Swimwear and intimate apparel are final sale</li>
                <li>• Sale items are final sale unless defective</li>
                <li>• Custom or personalized items cannot be returned</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-pink-600 mb-2">How long does shipping take?</h3>
                <p className="text-gray-600 text-sm">Standard shipping: 3-5 business days. Express shipping: 1-2 business days within the UK.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-pink-600 mb-2">Do you ship internationally?</h3>
                <p className="text-gray-600 text-sm">Yes, we ship worldwide. International shipping times vary by location (7-14 business days).</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-pink-600 mb-2">How can I track my order?</h3>
                <p className="text-gray-600 text-sm">You&apos;ll receive a tracking number via email once your order ships. Use this to track your package.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-pink-600 mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600 text-sm">We accept all major credit cards, PayPal, Apple Pay, and Google Pay.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-pink-600 mb-2">Can I change or cancel my order?</h3>
                <p className="text-gray-600 text-sm">Orders can be modified or cancelled within 1 hour of placement. Contact us immediately for assistance.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-pink-600 mb-2">Do you offer size exchanges?</h3>
                <p className="text-gray-600 text-sm">Yes! We offer free size exchanges within 30 days. Simply request an exchange through our returns process.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage; 