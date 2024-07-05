import QRCode from 'qrcode.react';
import { useRef } from 'react';
import { Button } from './ui/button';
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
    <div className='flex items-center flex-col gap-4'>
      <div className='qr-code ' ref={qrRef}>
        <QRCode
          value={JSON.stringify(value)}
          className='border border-black p-2.5 rounded-2xl'
        />
      </div>
      <Button className='btn' onClick={handleDownload}>
        Download QR Code
      </Button>
    </div>
  );
}
