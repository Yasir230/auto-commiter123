# GitHub Auto Commiter

Membuat satu commit untuk setiap tanggal pada 2026, mulai 1 Januari sampai hari ini (maksimum 31 Desember). Tanggal yang belum tiba tidak dibuat. Menjalankan ulang skrip melewati tanggal yang sudah dibuat oleh skrip ini.

## Persiapan

Diperlukan Node.js dan Git. Clone repositori Anda dan atur nama serta email Git yang terhubung ke akun GitHub:

```sh
git clone https://github.com/Yasir230/auto-commiter123.git
cd auto-commiter123
git config user.name "Nama Anda"
git config user.email "email-terverifikasi@example.com"
```

Pastikan perubahan yang ada sudah disimpan atau di-commit, lalu jalankan:

```sh
npm start
git push
```

Skrip membuat commit secara lokal dan tidak melakukan push otomatis. Jalankan lagi setelah tanggal berikutnya tiba. Agar GitHub menghitung kontribusi, commit harus berada di branch default repositori yang memenuhi syarat dan email commit harus terhubung ke akun Anda. Warna hijau bergantung pada skala kontribusi GitHub; satu commit per hari tidak menjamin tingkat warna tertentu.

## License

[MIT](./LICENSE)
