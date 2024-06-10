

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

export async function tambahAbsensi(tanggal,nis,nama,alamat,notlpn,kelas, keterangan,) {
  try {
    const dokRef = await addDoc(collection(db, 'produk'), {
      tanggal:tanggal,
      nis: nis,
      nama:nama,
      alamat:alamat,
      notlpn:notlpn,
      kelas:kelas,
      keterangan:keteranhan
    });
    console.log('Berhasil Absensi' + dokRef.id);
  } catch (e) {
    console.log('Gagal Absensi' + e);
  }
}

export async function hapusAbsensi(docId) {
  await deleteDoc(doc(db, "Absensi", docId));
}

export async function ubahProduk(tanggak,nis, nama, alamat,notlpn,kelas, keterangan) {
  await updateDoc(doc(db, "Absensi ", docId), { 
    tanggal: tanggal,
    nis: nis,
    nama: nama,
    alamat: alamat,
    notlpn: notlpn,
    kelas: kelas,
    keterangan: keterangan,
  });
}

export async function ambilAbsensi(docId) {
  const docRef = await doc(db, "Absensi", docId);
  const docSnap = await getDoc(docRef);
  
  return await docSnap.data();
}