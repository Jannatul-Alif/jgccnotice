(function () {
  const DEFAULT_CONFIG = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  window.JGCC_FIREBASE_CONFIG = window.JGCC_FIREBASE_CONFIG || DEFAULT_CONFIG;
  window.JGCC_USE_FIREBASE = window.JGCC_USE_FIREBASE !== false;

  function readLocalNotices() {
    try {
      return JSON.parse(localStorage.getItem("cadet_college_notices")) || [];
    } catch {
      return [];
    }
  }

  function writeLocalNotices(notices) {
    localStorage.setItem("cadet_college_notices", JSON.stringify(notices));
  }

  function isConfigured() {
    const config = window.JGCC_FIREBASE_CONFIG || {};
    const projectId = String(config.projectId || "");
    return window.JGCC_USE_FIREBASE !== false &&
      !!projectId &&
      !projectId.includes("YOUR_") &&
      !!config.apiKey &&
      !!config.appId;
  }

  window.JGCCFirebase = {
    init() {
      if (!isConfigured()) return false;
      if (!window.firebase) return false;

      if (!firebase.apps.length) {
        firebase.initializeApp(window.JGCC_FIREBASE_CONFIG);
      }

      return true;
    },

    async getNotices() {
      const localNotices = readLocalNotices();

      if (!this.init()) {
        return localNotices;
      }

      try {
        const snapshot = await firebase.firestore().collection("noticeBoard").doc("board").get();
        const notices = snapshot.data()?.notices;

        if (Array.isArray(notices)) {
          writeLocalNotices(notices);
          return notices;
        }

        return localNotices;
      } catch (error) {
        console.warn("Firebase load failed. Using local storage instead.", error);
        return localNotices;
      }
    },

    async saveNotices(notices) {
      writeLocalNotices(notices);

      if (!this.init()) {
        return;
      }

      try {
        await firebase.firestore().collection("noticeBoard").doc("board").set({ notices }, { merge: true });
      } catch (error) {
        console.warn("Firebase save failed. Local storage was still updated.", error);
      }
    }
  };
})();
