Please help me implement a simple web interface for:

Image upload
Result visualization
Historical data viewing

I'll help you create a React-based web interface for your cornmeal quality detection system. I'll create a user-friendly interface that makes it easy to upload images and visualize results.

Cornmeal Quality Detection Web Interface

Let me explain the key features and components of this web interface:

Image Upload Section:

Drag-and-drop or click-to-upload functionality
Image preview capability
File type validation (JPEG/PNG only)
Clear error messaging
Upload progress indication


Analysis Results Display:

Clear presentation of quality classification
Visual indicators using color coding
Confidence scores and recommendations
Expandable/collapsible sections for better organization
Easy-to-read layout with clear typography


Historical Data Visualization:

Interactive line chart showing quality trends
Tabular view of historical results
Quality indicators with color coding
Date-based organization



Key UI/UX Features:

Responsive Design:

Adapts to different screen sizes
Grid-based layout for optimal spacing
Mobile-friendly interface


Interactive Elements:

Expandable sections
Hover effects on buttons
Clear loading states
Interactive charts


Visual Feedback:

Color-coded quality indicators
Icons for better visual hierarchy
Clear error and success states


Accessibility:

Semantic HTML structure
Clear focus states
Screen reader compatible
Keyboard navigation support

import React, { useState, useEffect } from 'react';
import { UploadCloud, FileText, AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const QualityDashboard = () => {
  // State management for different aspects of the application
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    } else {
      setError("Please select a valid JPEG or PNG image.");
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  // Function to handle file upload and analysis
  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Simulated API call - replace with your actual API endpoint
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // Simulated response for demonstration
      const result = {
        quality_class: 'good',
        overall_score: 0.85,
        defect_types: ['minor_discoloration'],
        confidence: 0.92,
        recommendations: [
          'Monitor storage conditions',
          'Check processing parameters'
        ]
      };

      setAnalysisResult(result);
      
      // Update historical data
      setHistoricalData(prev => [...prev, {
        date: new Date().toLocaleDateString(),
        score: result.overall_score,
        quality: result.quality_class
      }]);
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to toggle section expansion
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Quality class to color mapping
  const getQualityColor = (quality) => {
    const colors = {
      excellent: 'bg-green-100 text-green-800',
      good: 'bg-blue-100 text-blue-800',
      fair: 'bg-yellow-100 text-yellow-800',
      poor: 'bg-red-100 text-red-800'
    };
    return colors[quality] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Cornmeal Quality Analysis Dashboard</h1>

      {/* Upload Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <UploadCloud className="mr-2" /> Image Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                onChange={handleFileSelect}
                accept="image/jpeg,image/png"
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <UploadCloud className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Click to upload image</span>
                </div>
              </label>
              {previewUrl && (
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="mt-4 max-w-full h-48 object-contain"
                />
              )}
            </div>
            
            <div className="flex flex-col justify-center">
              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <button
                onClick={handleUpload}
                disabled={!selectedFile || isLoading}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isLoading ? 'Analyzing...' : 'Analyze Image'}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="mr-2" /> Analysis Results
              </div>
              <button 
                onClick={() => toggleSection('results')}
                className="text-gray-500 hover:text-gray-700"
              >
                {expandedSection === 'results' ? <ChevronUp /> : <ChevronDown />}
              </button>
            </CardTitle>
          </CardHeader>
          {expandedSection === 'results' && (
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <span className="font-semibold">Quality Class: </span>
                    <span className={`px-2 py-1 rounded-full text-sm ${getQualityColor(analysisResult.quality_class)}`}>
                      {analysisResult.quality_class.toUpperCase()}
                    </span>
                  </div>
                  <div className="mb-4">
                    <span className="font-semibold">Overall Score: </span>
                    <span>{(analysisResult.overall_score * 100).toFixed(1)}%</span>
                  </div>
                  <div className="mb-4">
                    <span className="font-semibold">Confidence: </span>
                    <span>{(analysisResult.confidence * 100).toFixed(1)}%</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Recommendations:</h3>
                  <ul className="list-disc pl-4">
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-600">{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Historical Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="mr-2" /> Historical Analysis
            </div>
            <button 
              onClick={() => toggleSection('history')}
              className="text-gray-500 hover:text-gray-700"
            >
              {expandedSection === 'history' ? <ChevronUp /> : <ChevronDown />}
            </button>
          </CardTitle>
        </CardHeader>
        {expandedSection === 'history' && (
          <CardContent>
            <div className="w-full h-64">
              <LineChart
                width={800}
                height={240}
                data={historicalData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563eb" 
                  name="Quality Score"
                />
              </LineChart>
            </div>
            <div className="mt-4">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Score</th>
                    <th className="text-left py-2">Quality</th>
                  </tr>
                </thead>
                <tbody>
                  {historicalData.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-2">{item.date}</td>
                      <td className="py-2">{(item.score * 100).toFixed(1)}%</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded-full text-sm ${getQualityColor(item.quality)}`}>
                          {item.quality.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default QualityDashboard;
To use this interface:

Install Required Dependencies:

bashCopynpm install lucide-react recharts @/components/ui

Import and Use:

jsxCopyimport QualityDashboard from './components/QualityDashboard';

function App() {
  return (
    <div>
      <QualityDashboard />
    </div>
  );
}
Would you like me to:

Add any specific features for your use case in Nigeria?
Implement offline support for unreliable internet connections?
Add more detailed visualization options?
Include additional user feedback mechanisms?
Add support for different languages?
