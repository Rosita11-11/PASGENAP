import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js ";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"
const firebaseConfig = {
  apiKey: "AIzaSyBm9HdJ92vSLrKRclI6Z2J4bmvlFgR4AuU",
  authDomain: "mang-yana.firebaseapp.com",
  projectId: "mang-yana",
  storageBucket: "mang-yana.appspot.com",
  messagingSenderId: "1094982396668",
  appId: "1:1094982396668:web:2d103526ab40a59efc0579",
  measurementId: "G-MF48P7VG5P"
}
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarsiswa() {
  const refDokumen = collection(db, "siswa");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id, 
      tanggal: dok.data().tanggal,
      nis: dok.data().nis,
      nama: dok.data().nama,
      alamat: dok.data().alamat,
      notlpn: dok.data().notlpn,
      kelas: dok.data().kelas,
      keterangan:dok.data().keterangan,
    });
  });
  
  return hasil;
}

export function formatAngka(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahsiswa(tanggal,nis,nama,alamat,notlpn,kelas, keterangan,) {
  try {
    const dokRef = await addDoc(collection(db, 'siswa'), {
      tanggal:tanggal,
      nis: nis,
      nama:nama,
      alamat:alamat,
      notlpn:notlpn,
      kelas:kelas,
      keterangan:keteranhan
    });
    console.log('Berhasil siswa' + dokRef.id);
  } catch (e) {
    console.log('Gagal siswa' + e);
  }
}

export async function hapussiswa(docId) {
  await deleteDoc(doc(db, "siswa", docId));
}

export async function ubahProduk(tanggak,nis, nama, alamat,notlpn,kelas, keterangan) {
  await updateDoc(doc(db, "siswa", docId), { 
    tanggal: tanggal,
    nis: nis,
    nama: nama,
    alamat: alamat,
    notlpn: notlpn,
    kelas: kelas,
    keterangan: keterangan,
  });
}

export async function ambilsiswa(docId) {
  const docRef = await doc(db, "siswa", docId);
  const docSnap = await getDoc(docRef);
  
  return await docSnap.data();
}