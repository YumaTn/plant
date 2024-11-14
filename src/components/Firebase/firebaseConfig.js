// Import các hàm cần thiết từ Firebase SDK
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Cấu hình Firebase cho ứng dụng của bạn
const firebaseConfig = {
  apiKey: "AIzaSyDcCQ2jEBFAOccvwRL7Z14oEKmt4o5y7sI",
  authDomain: "foodapp-fa62e.firebaseapp.com",
  databaseURL: "https://foodapp-fa62e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "foodapp-fa62e",
  storageBucket: "foodapp-fa62e.appspot.com",
  messagingSenderId: "700622443732",
  appId: "1:700622443732:web:667156298bee5abce9d741",
  measurementId: "G-99WDYN9Q8T"
};

// Khởi tạo Firebase và Storage
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
