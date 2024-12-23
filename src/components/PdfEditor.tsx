import React, { useState, useRef } from 'react';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './PdfEditor.css';

// Set worker path
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const PdfEditor = () => {
  const [, setPdfFile] = useState<File | null>(null);
  const [pdfContent, setPdfContent] = useState<Uint8Array | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [text, setText] = useState({ content: '', x: 50, y: 50, size: 12 });
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [viewPdf, setViewPdf] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setIsProcessing(true);
        setPdfFile(file);
        
        // Read file as ArrayBuffer first
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pdfBytes = await pdfDoc.save();
        setPdfContent(pdfBytes);

        // Create blob URL for preview
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const fileUrl = URL.createObjectURL(blob);
        setViewPdf(fileUrl);
      } catch (error) {
        console.error('Error loading PDF:', error);
        alert('Failed to load PDF');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // Clean up URL on unmount
  React.useEffect(() => {
    return () => {
      if (viewPdf) {
        URL.revokeObjectURL(viewPdf);
      }
    };
  }, [viewPdf]);

  const handleTextAdd = async () => {
    if (!pdfContent || !text.content) return;
    
    try {
      setIsProcessing(true);
      const pdfDoc = await PDFDocument.load(pdfContent);
      const pages = pdfDoc.getPages();
      const page = pages[currentPage - 1];
      
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      page.drawText(text.content, {
        x: text.x,
        y: page.getHeight() - text.y,
        size: text.size,
        font,
        color: rgb(0, 0, 0),
        rotate: degrees(rotation),
      });

      const modifiedPdfBytes = await pdfDoc.save();
      setPdfContent(modifiedPdfBytes);
    } catch (error) {
      console.error('Error adding text:', error);
      alert('Failed to add text');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!pdfContent) return;
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'edited-document.pdf';
    link.click();
    URL.revokeObjectURL(url);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="pdf-editor">
      <div className="toolbar">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="file-input"
        />
        <div className="zoom-controls">
          <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))}>Zoom Out</button>
          <span>{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale(s => Math.min(2, s + 0.1))}>Zoom In</button>
        </div>
        <div className="rotation-controls">
          <button onClick={() => setRotation(r => r - 90)}>Rotate Left</button>
          <button onClick={() => setRotation(r => r + 90)}>Rotate Right</button>
        </div>
      </div>

      <div className="editor-container">
        <div className="pdf-preview">
          {viewPdf && (
            <Document
              file={viewPdf}
              onLoadSuccess={onDocumentLoadSuccess}
              error={<div className="error-message">Error loading PDF!</div>}
              loading={<div className="loading-message">Loading PDF...</div>}
              noData={<div className="no-data-message">Please select a PDF file</div>}
            >
              <Page
                pageNumber={currentPage}
                scale={scale}
                rotate={rotation}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                error={<div className="error-message">Error loading page!</div>}
                loading={<div className="loading-message">Loading page...</div>}
              />
            </Document>
          )}
        </div>

        <div className="editor-controls">
          <div className="page-navigation">
            <button 
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Previous
            </button>
            <span>Page {currentPage} of {numPages}</span>
            <button 
              disabled={currentPage >= numPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next
            </button>
          </div>

          <div className="text-editor">
            <h3>Add Text</h3>
            <textarea
              value={text.content}
              onChange={(e) => setText({ ...text, content: e.target.value })}
              placeholder="Enter text to add..."
            />
            <div className="text-controls">
              <label>
                X Position:
                <input
                  type="number"
                  value={text.x}
                  onChange={(e) => setText({ ...text, x: Number(e.target.value) })}
                />
              </label>
              <label>
                Y Position:
                <input
                  type="number"
                  value={text.y}
                  onChange={(e) => setText({ ...text, y: Number(e.target.value) })}
                />
              </label>
              <label>
                Font Size:
                <input
                  type="number"
                  value={text.size}
                  onChange={(e) => setText({ ...text, size: Number(e.target.value) })}
                />
              </label>
            </div>
            <button 
              onClick={handleTextAdd}
              disabled={isProcessing || !text.content}
            >
              Add Text
            </button>
          </div>

          <button 
            className="download-button"
            onClick={handleDownload}
            disabled={!pdfContent}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfEditor;
