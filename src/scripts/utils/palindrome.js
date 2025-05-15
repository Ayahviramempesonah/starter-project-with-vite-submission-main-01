// // function run(x, y) {
// //   let index = x.indexOf(y);
// //   if (index !== -1) {
// //       return `Nomor identitas ditemukan di urutan ke ${index + 1}`;
// //   } else {
// //       return 'Nomor identitas tidak ditemukan';
// //   }
// //   return 0; // return 0 agar sesuai dengan aturan
// // }

// // function run(arr) {
// //   const freq = {};
// //   for (let i = 0; i < arr.length; i++) {
// //     const val = arr[i];
// //     if (freq[val] === undefined) {
// //       freq[val] = 1;
// //     } else {
// //       freq[val]++;
// //     }
// //   }
// //   console.log(freq);
// //   return 0;
// // }

// // console.log(run([1,2,3,4,5,6,5],5));

// function run(x, y) {
//   const hasil = x.filter(buku => buku.includes(y));
//   return hasil.length > 0 ? hasil : []; // Return array jika ada, [] jika tidak
// }

// console.log(run(['satu','dua','tiga'],"satu"))

// function mek(x, y) {
//   const index = x.indexOf(y);
//   return index !== -1 ? `Nomor identitas ditemukan di urutan ke ${index + 1}` : "Nomor identitas tidak ditemukan";
// }

// console.log(mek([12,22,11,],129))

// function runb(arr){
// if(!arr || arr.length === 0 ) return 0 ;
// const freq={};
// for (const num of arr){
//   freq[num] = (freq[num] || 0) + 1;
// }
// return freq;
// }

// function run(x,y){
//   const hasil = x.filter(buku => buku.includes(y));
//   return hasil.length > 0 ? hasil: [] ;
// }

// function run(x, y) {
//   // Validasi input: return 0 untuk input tidak valid
//   if (!Array.isArray(x) || typeof y !== 'number') {
//     return 0;
//   }

//   // Handle array kosong - return pesan string
//   if (x.length === 0) {
//     return "Nomor identitas tidak ditemukan";
//   }

//   // Pencarian data
//   for (let i = 0; i < x.length; i++) {
//     if (typeof x[i] !== 'number') continue;

//     // Perbandingan untuk semua jenis number
//     const tolerance = 1e-10;
//     if (Math.abs(x[i] - y) < tolerance) {
//       return `Nomor identitas ditemukan di urutan ke ${i + 1}`;
//     }
//   }

//   // Return pesan jika tidak ditemukan
//   return "Nomor identitas tidak ditemukan";
// }

// function run(x, y) {
//   const hasil = x.map((buku, index) => buku === y? index + 1 : null).filter((buku) => buku!== null);
//   return hasil.length > 0? `Nomor identitas ditemukan di urutan ke ${hasil.join(', ')}` : "Nomor identitas tidak ditemukan";
// }

// // Contoh test case sesuai permintaan
// console.log(run([57, 88, 29, 10, 28, 44, 98], 576));
// // Output: "Nomor identitas ditemukan di urutan ke 1"

// console.log(run([12.9, 29.1, 44.2, 98.7, 61.5], 50));
// // Output: "Nomor identitas tidak ditemukan"

// console.log(run([822, 912, 442, 917, 618], 912));
// // Output: "Nomor identitas ditemukan di urutan ke 2"

// console.log(run([1, 4, 6, 2, 9, 8], 5));
// // Output: "Nomor identitas tidak ditemukan"

// console.log(run([1.8, 9.9, 2.8, 5.5, 2.8], 5.5));
// // Output: "Nomor identitas ditemukan di urutan ke 4"

///

// function run(arr){
//   if(!arr || arr.length === 0 ) return 0 ;
//   const freq={};
//   for (const num of arr){
//     freq[num] = (freq[num] || 0) + 1;
//   }
//   return freq;
//   }
//   , code ini lolos testcase 10 dari 10,

// function run(x,y){
//   const hasil = x.filter(buku => buku.includes(y));
//   return hasil.length > 0 ? hasil: [] ;
// }
// , code ini lolos testcase 8 dari 10,

//   function run(x, y) {
//     const hasil = x.map((buku, index) => buku === y? index+ 1 : null).filter((buku) => buku!== null);
//     return hasil.length > 0? `Nomor identitas ditemukan di urutan ke ${hasil.join(', ')}` : "Nomor identitas tidak ditemukan";
//   }
//   // , code ini lolos testcase 1 dari 10, analisis pola testcasenya untuk memperbaiki code yang ke3?

//   //test
//   function testRun(){
//     let pass = 0
//       let failed = 0

// //logic test
// function assertEquals(actual,expected,message){
// if(actual === expected){
//   console.log(`OK PASS : ${message}`)
//   pass++
// }else{
//   console.error(`X FAILED : ${message}`)
//   console.error(` EXPECTED: ${expected}`)
// console.error(` RECEIVED : ${actual}`)
// failed++
// }
// }

// assertEqual(run([57, 88, 29, 10, 28, 44, 98], 57), "Nomor identitas ditemukan di urutan ke 1", "Testcase 1");
//   assertEqual(run([12.9, 29.1, 44.2, 98.7, 61.5], 50), "Nomor identitas tidak ditemukan", "Testcase 2");
//   assertEqual(run([822, 912, 442, 917, 618], 912), "Nomor identitas ditemukan di urutan ke 2", "Testcase 3");
//   assertEqual(run([1, 4, 6, 2, 9, 8], 7), "Nomor identitas tidak ditemukan", "Testcase 4");
//   assertEqual(run([1.8, 9.9, 2.8, 5.5, 2.8], 5.5), "Nomor identitas ditemukan di urutan ke 4", "Testcase 5");
//   assertEqual(run([2, 3, 2, 4, 2], 2), "Nomor identitas ditemukan di urutan ke 1,3,5", "Testcase 6");
//   assertEqual(run([], 100), "Nomor identitas tidak ditemukan", "Testcase 7");
//   assertEqual(run(["a", "b", "c"], "b"), "Nomor identitas ditemukan di urutan ke 2", "Testcase 8");
//   assertEqual(run(["x", "y", "x", "z"], "x"), "Nomor identitas ditemukan di urutan ke 1,3", "Testcase 9");
//   assertEqual(run([null, null, 0, undefined], null), "Nomor identitas ditemukan di urutan ke 1,2", "Testcase 10");

//   console.log(`\nSummary: ${pass} Passed, ${failed} Failed`);

//   }
// testRun()

//lagi

// function run(x, y) {
//   const hasil = x.map((buku, index) => String(buku) == String(y) ? index + 1 : null)
//                  .filter((buku) => buku !== null);
//   return hasil.length > 0
//     ? `Nomor identitas ditemukan di urutan ke ${hasil.join(', ')}`
//     : "Nomor identitas tidak ditemukan";
// }

function run(x, y) {
  const index = x.indexOf(y);
  return {
    found: index !== -1,
    position: index !== -1 ? index + 1 : null,
    message:
      index !== -1
        ? `Nomor identitas ditemukan di urutan ke ${index + 1}`
        : 'Nomor identitas tidak ditemukan',
  };
}

function testRun() {
  let pass = 0;
  let failed = 0;

  function assertEqual(actual, expected, message) {
    if (actual === expected) {
      console.log(`✅ PASS: ${message}`);
      pass++;
    } else {
      console.error(`❌ FAIL: ${message}`);
      console.error(`⚠️ Expected: "${expected}"`);
      console.error(`🟡 Received: "${actual}"`);
      failed++;
    }
  }

  assertEqual(
    run([57, 88, 29, 10, 28, 44, 98], 57),
    'Nomor identitas ditemukan di urutan ke 1',
    'Testcase 1',
  );
  assertEqual(
    run([12.9, 29.1, 44.2, 98.7, 61.5], 50),
    'Nomor identitas tidak ditemukan',
    'Testcase 2',
  );
  assertEqual(
    run([822, 912, 442, 917, 618], 912),
    'Nomor identitas ditemukan di urutan ke 2',
    'Testcase 3',
  );
  assertEqual(run([1, 4, 6, 2, 9, 8], 7), 'Nomor identitas tidak ditemukan', 'Testcase 4');
  assertEqual(
    run([1.8, 9.9, 2.8, 5.5, 2.8], 5.5),
    'Nomor identitas ditemukan di urutan ke 4',
    'Testcase 5',
  );
  assertEqual(
    run([2, 3, 2, 4, 2], 2),
    'Nomor identitas ditemukan di urutan ke 1, 3, 5',
    'Testcase 6',
  );
  assertEqual(run([], 100), 'Nomor identitas tidak ditemukan', 'Testcase 7');
  assertEqual(run(['a', 'b', 'c'], 'b'), 'Nomor identitas ditemukan di urutan ke 2', 'Testcase 8');
  assertEqual(
    run(['x', 'y', 'x', 'z'], 'x'),
    'Nomor identitas ditemukan di urutan ke 1, 3',
    'Testcase 9',
  );
  assertEqual(
    run([null, null, 0, undefined], null),
    'Nomor identitas ditemukan di urutan ke 1, 2',
    'Testcase 10',
  );

  console.log(`\nSummary: ${pass} Passed, ${failed} Failed`);
}

testRun();
