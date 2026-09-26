(function () {
  const DEFAULT_CONFIG = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  const config = window.JGCC_FIREBASE_CONFIG || DEFAULT_CONFIG;
  const state = {
    db: null,
    initialized: false
  };

  function hasValidConfig() {
    return !!config.projectId &&
      config.projectId.indexOf("YOUR_") === -1 &&
      !!window.JGCC_USE_FIREBASE;
  }

  window.JGCCFirebase = {
    config,

    init() {
      if (state.initialized) return true;
      if (!hasValidConfig()) return false;
      if (!window.firebase) return false;

      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }

      state.db = firebase.firestore();
      state.initialized = true;
      return true;
    },

    async getNotices() {
      if (!this.init()) {
        try {
          return JSON.parse(localStorage.getItem("cadet_college_notices")) || [];
        } catch {
          return [];
        }
      }

      const snapshot = await state.db.collection("noticeBoard").doc("board").get();
      const notices = snapshot.data()?.notices;
      return Array.isArray(notices) ? notices : [];
    },

    async saveNotices(notices) {
      if (!this.init()) {
        localStorage.setItem("cadet_college_notices", JSON.stringify(notices));
        return;
      }

      await state.db.collection("noticeBoard").doc("board").set({ notices }, { merge: true });
    }
  };
})();
