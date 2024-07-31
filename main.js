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
  apiKey: "AIzaSyBYd6vdeRvwnywCPqeWh5PcdcNJj1kLfoo",
    authDomain: "insancemerlang-2953a.firebaseapp.com",
    projectId: "insancemerlang-2953a",
    storageBucket: "insancemerlang-2953a.appspot.com",
    messagingSenderId: "134418826980",
    appId: "1:134418826980:web:ce438f43a3da1456b44ef1",
    measurementId: "G-K6CVYVCMZP"
}
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarAbsensi() {
  const refDokumen = collection(db, "absensi");
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
      noTlpn: dok.data().noTlpn,
      kelas: dok.data().kelas,
      keterangan: dok.data().keterangan,
    });
  });

  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahAbsensi(tanggal, nis, nama, alamat, noTlpn, kelas, keterangan) {
  try {
    const dokRef = await addDoc(collection(db, 'absensi'), {
      
      tanggal: tanggal,
      nis: nis,
      nama: nama,
      alamat: alamat,
      noTlpn: noTlpn,
      kelas: kelas,
      keterangan: keterangan
    });
    console.log('berhasil menembah ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah ' + e);
  }
}

export async function hapusAbsensi(docId) {
  
  await deleteDoc(doc(db, "absensi", 
  docId));
}



export async function ubahAbsensi(tanggal, nis, nama, alamat, noTlpn, kelas, keterangan) {
    await updateDoc(doc(db, 'absensi',
    docld), {
      tanggal: tanggal,
      nis: nis,
      nama: nama,
      alamat: alamat,
      noTlpn: noTlpn,
      kelas: kelas,
      keterangan: keterangan
    })
}

export async function ambilAbsensi(docId) {
  const docRef = await doc(db, "absensi", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}