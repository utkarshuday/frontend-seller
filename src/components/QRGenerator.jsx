import QRCode from 'qrcode.react';
import { useRef } from 'react';
export default function QRGenerator({ value }) {
  const qrRef = useRef(null);

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `${value}.png`;
    link.click();
  };

  return (
    <>
      <div className='qr-code' ref={qrRef}>
        <QRCode
          value={JSON.stringify(value)}
          className='border border-black p-2'
        />
      </div>
      <button className='btn' onClick={handleDownload}>
        Download QR Code
      </button>
    </>
  );
}
