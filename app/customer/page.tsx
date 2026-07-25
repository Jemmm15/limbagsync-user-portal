'use client';

import { useState } from 'react';
import { ArrowLeft, Upload, X, FileText, QrCode } from 'lucide-react';
import Image from 'next/image';

interface UploadedFile {
  id: string;
  name: string;
}

export default function CustomerPortal() {
  const [activeTab, setActiveTab] = useState<'order' | 'history'>('order');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [paymentFile, setPaymentFile] = useState<UploadedFile | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    category: 'Short Bond Paper',
    color: 'B&W',
    copies: 1,
    fulfillment: 'Store Pickup',
    branch: '',
    pickupTime: '12:03 PM',
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files) {
      Array.from(files).forEach((file) => {
        setUploadedFiles((prev) => [
          ...prev,
          { id: Date.now().toString(), name: file.name },
        ]);
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach((file) => {
        setUploadedFiles((prev) => [
          ...prev,
          { id: Date.now().toString(), name: file.name },
        ]);
      });
    }
  };

  const handlePaymentFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentFile({
        id: Date.now().toString(),
        name: e.target.files[0].name,
      });
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const removePaymentFile = () => {
    setPaymentFile(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopiesChange = (delta: number) => {
    setFormData((prev) => ({
      ...prev,
      copies: Math.max(1, prev.copies + delta),
    }));
  };

  const total = 2.0;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LS</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">LimbagSync</h1>
          </div>
          <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-full transition-colors">
            <ArrowLeft className="inline-block mr-2 w-4 h-4" />
            Back to User Portal
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Online Ordering Portal</h2>

        {/* Tabs */}
        <div className="flex gap-8 mb-8 border-b border-gray-300">
          <button
            onClick={() => setActiveTab('order')}
            className={`pb-3 font-semibold text-lg transition-colors ${
              activeTab === 'order'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Place an Order
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 font-semibold text-lg transition-colors ${
              activeTab === 'history'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Order History & Tracking
          </button>
        </div>

        {activeTab === 'order' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Upload & Configure */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Upload & Configure
              </h3>

              {/* Drag & Drop Area */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-blue-300 bg-blue-50 hover:border-blue-400'
                }`}
              >
                <Upload className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <p className="text-gray-700 font-semibold mb-2">Drag & Drop File Here</p>
                <label className="text-blue-600 font-semibold cursor-pointer hover:underline">
                  Browse
                  <input
                    type="file"
                    multiple
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700 font-medium">{file.name}</span>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Category */}
              <div className="mt-8">
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 font-medium"
                >
                  <option>Short Bond Paper</option>
                  <option>Long Bond Paper</option>
                  <option>Cardstock</option>
                </select>
              </div>

              {/* Color & Copies */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">
                    Color
                  </label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 font-medium"
                  >
                    <option>B&W</option>
                    <option>Color</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">
                    Copies
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopiesChange(-1)}
                      className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-gray-900"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={formData.copies}
                      onChange={handleInputChange}
                      name="copies"
                      className="flex-1 p-2 border border-gray-300 rounded-lg text-center font-semibold text-gray-900"
                    />
                    <button
                      onClick={() => handleCopiesChange(1)}
                      className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-gray-900"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Total */}
              <button className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors">
                Your total is P{total.toFixed(2)}
              </button>
            </div>

            {/* Right Column - Checkout */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h3>

              {/* Contact Information */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Contact Information
                </label>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-blue-400 rounded-lg text-gray-900 placeholder-gray-500 font-medium"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number or Email Address (required for tracking)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-blue-400 rounded-lg text-gray-900 placeholder-gray-500 font-medium"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Home Address / Delivery Address (For delivery)"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-blue-400 rounded-lg text-gray-900 placeholder-gray-500 font-medium"
                  />
                </div>
              </div>

              {/* Fulfillment */}
              <div className="mb-8">
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  Fulfillment
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    name="fulfillment"
                    value={formData.fulfillment}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-lg bg-gray-200 text-gray-900 font-medium"
                  >
                    <option>Store Pickup</option>
                    <option>Delivery</option>
                  </select>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-lg bg-gray-200 text-gray-900 font-medium"
                  >
                    <option value="">Choose Branch</option>
                    <option>Branch A</option>
                    <option>Branch B</option>
                  </select>
                </div>
              </div>

              {/* Preferred Pickup Time */}
              <div className="mb-8">
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  Preferred Pickup Time
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="bg-gray-200 px-4 py-2 rounded-lg font-semibold text-gray-900">
                    {formData.pickupTime}
                  </span>
                </div>
              </div>

              {/* Warning */}
              <div className="mb-8 flex items-start gap-2 bg-red-50 p-3 rounded-lg">
                <span className="text-red-600 font-bold text-lg mt-0.5">⚠</span>
                <p className="text-red-600 font-semibold">
                  Order stays Pending until owner verifies your payment.
                </p>
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  Payment Method (GCash Only)
                </label>
                <div className="bg-gray-100 p-4 rounded-lg mb-4 flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-gray-400" />
                </div>
                <p className="text-gray-700 font-medium mb-3 text-center">
                  Scan to pay via GCash app.
                </p>
                <label className="block w-full">
                  <input
                    type="file"
                    onChange={handlePaymentFileInput}
                    className="hidden"
                  />
                  <div className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-center cursor-pointer transition-colors">
                    Upload Payment Screenshot
                  </div>
                </label>

                {/* Payment File Preview */}
                {paymentFile && (
                  <div className="mt-3 flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-700 font-medium">{paymentFile.name}</span>
                    </div>
                    <button
                      onClick={removePaymentFile}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors text-lg">
                Submit Order
              </button>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <p className="text-gray-600 text-lg">Your order history will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
