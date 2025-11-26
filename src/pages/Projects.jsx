import React, {useState, useRef, useEffect} from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode';
import { verifyVipCode, uploadProjectFile, createVipCode } from '@/firebase';
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'

export default function Projects(){
  const [accessGranted, setAccessGranted] = useState(false)
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState('')
  const scannerRef = useRef(null)
  const fileRef = useRef()

  useEffect(()=> {
    // cleanup scanner on unmount
    return ()=> { if(scannerRef.current && scannerRef.current.clear) scannerRef.current.clear() }
  },[])

  const startScanner = () => {
    setError('')
    const scanner = new Html5QrcodeScanner(
      "reader", { fps: 10, qrbox: 250 }, false);
    scanner.render(async (decodedText, decodedResult) => {
      scanner.clear()
      setChecking(true)
      const ok = await verifyVipCode(decodedText)
      setChecking(false)
      if(ok){
        setAccessGranted(true)
      } else {
        setError('Kode VIP tidak ditemukan. Silakan bayar atau hubungi admin.')
      }
    }, (error)=>{ /* ignore scan errors */ });
    scannerRef.current = scanner;
  }

  const manualCheck = async()=>{
    const v = document.getElementById('code').value
    setChecking(true)
    const ok = await verifyVipCode(v)
    setChecking(false)
    if(ok) setAccessGranted(true)
    else setError('Kode tidak valid')
  }

  const upload = async ()=>{
    const f = fileRef.current.files[0]
    if(!f) return alert('Pilih file terlebih dahulu.')
    const url = await uploadProjectFile('projects', f)
    alert('File diupload. URL: '+url)
  }

  // simulate payment: in production, call server to create transaction and then create vip code in DB after success
  const simulatePaymentAndCreateVip = async ()=>{
    const newCode = 'VIP-'+Date.now()
    await createVipCode(newCode, {amount:25000, note:'simulated'})
    alert('Pembayaran simulasi berhasil. Kode VIP: '+newCode + '\nGunakan kode ini untuk scan.')
  }

  return (
    <div>
      <h2>Projects</h2>
      {!accessGranted && (
        <>
          <Card>
            <p>Untuk membuka Projects, scan barcode (barcode berfungsi sebagai password). Jika tidak punya, lakukan pembayaran VIP (20k-30k) untuk menerima kode.</p>
            <div id="reader" style={{width:'100%'}}></div>
            <div style={{marginTop:8}}>
              <Button onClick={startScanner}>Mulai Scan Barcode</Button>
            </div>
            <hr />
            <p>Atau masukkan kode manual:</p>
            <input id="code" placeholder="Masukkan kode VIP" />
            <Button onClick={manualCheck}>Cek Kode</Button>
            {checking && <p>Memeriksa...</p>}
            {error && <p style={{color:'red'}}>{error}</p>}
            <hr/>
            <p>Atau lakukan pembayaran:</p>
            <Button onClick={simulatePaymentAndCreateVip}>Bayar (Simulasi) 25k</Button>
          </Card>
        </>
      )}
      {accessGranted && (
        <Card>
          <p>Akses Projects diberikan. Upload source code:</p>
          <input type="file" ref={fileRef}/>
          <Button onClick={upload}>Upload ke Firebase Storage</Button>
          <section>
            <h3>Daftar Projek (Realtime)</h3>
            <p>Proyek yang diupload akan muncul di sini setelah Anda mengimplementasikan listener Realtime DB (sudah disiapkan di firebase helper saat upload).</p>
          </section>
        </Card>
      )}
    </div>
  )
}
