export default function DefaultView({ pdfText }) {
  return (
    <pre className="text-gray-600 whitespace-pre-wrap">
      {typeof pdfText === 'string' ? pdfText : JSON.stringify(pdfText, null, 2)}
    </pre>
  );
} 