// js/app.js - Logik Interaktif Platform Pembelajaran Incoterms SLK30203

document.addEventListener("DOMContentLoaded", () => {
  // --- KUMPULAN STATE APLIKASI ---
  const state = {
    studentName: "Pelajar SPL",
    currentProgress: {
      introRead: false,
      historyExplored: false,
      termsViewed: new Set(),
      simulationRuns: new Set(),
      calculatorInteracted: false,
      quizCompleted: false
    },
    locks: {
      mod3: false,
      mod4: false,
      kuiz: false
    },
    activeTerm: "EXW",
    simSelectedTerm: "EXW",
    simRunning: false,
    caseStudyParams: { ...IncotermsData.defaultCaseStudy },
    quizState: {
      currentQuestionIdx: 0,
      score: 0,
      answers: [], // menyimpan betul/salah setiap soalan
      isAnswered: false,
      userAnswersCount: 0
    },
    classStudents: []
  };

  // --- ELEMEN-ELEMEN DOM ---
  const DOM = {
    // Navigasi
    tabs: document.querySelectorAll(".tab-btn"),
    sections: document.querySelectorAll(".module-section"),
    progressBar: document.getElementById("overall-progress-bar"),
    progressText: document.getElementById("overall-progress-text"),
    btnStartLearning: document.getElementById("btn-start-learning"),
    
    // Nama Pelajar
    nameCard: document.getElementById("student-name-card"),
    inputStudentName: document.getElementById("input-student-name"),
    btnSaveStudentName: document.getElementById("btn-save-student-name"),
    certStudentName: document.getElementById("cert-student-name"),
    pdfStudentName: document.getElementById("pdf-student-name"),
    
    // Modul 1
    definitionText: document.getElementById("txt-incoterms-definition"),
    pillarsContainer: document.getElementById("pillars-list-container"),
    notControlledList: document.getElementById("not-controlled-list"),
    timelineSlider: document.getElementById("slider-timeline-history"),
    timelineTicks: document.getElementById("timeline-ticks-container"),
    timelineYear: document.getElementById("timeline-display-year"),
    timelineText: document.getElementById("timeline-display-text"),
    btnPrevTimeline: document.getElementById("btn-prev-timeline"),
    btnNextTimeline: document.getElementById("btn-next-timeline"),
    updatesContainer: document.getElementById("updates-2020-container"),
    
    // Modul 2
    filterBtns: document.querySelectorAll(".filter-btn"),
    termsGrid: document.getElementById("terms-grid-container"),
    termDetailSection: document.getElementById("term-detail-section"),
    
    // Modul 3
    simTermTitle: document.getElementById("sim-term-title"),
    simModeDisplay: document.getElementById("sim-mode-display"),
    simVehicle: document.getElementById("cargo-transit-vehicle"),
    simRiskIndicator: document.getElementById("sim-risk-indicator"),
    simCostSellerBar: document.getElementById("cost-bar-seller"),
    simCostBuyerBar: document.getElementById("cost-bar-buyer"),
    simCostPointText: document.getElementById("sim-cost-point-text"),
    simRiskPointText: document.getElementById("sim-risk-point-text"),
    simTermsList: document.getElementById("sim-terms-selector-list"),
    btnRunSimulation: document.getElementById("btn-run-simulation"),
    simCustomsExportCard: document.getElementById("sim-customs-export-card"),
    simCustomsImportCard: document.getElementById("sim-customs-import-card"),
    simCustomsExportPihak: document.getElementById("sim-customs-export-pihak"),
    simCustomsImportPihak: document.getElementById("sim-customs-import-pihak"),
    simCustomsExportStamp: document.getElementById("sim-customs-export-stamp"),
    simCustomsImportStamp: document.getElementById("sim-customs-import-stamp"),
    
    // Modul 4
    caseStudyList: document.getElementById("case-study-params-list"),
    btnResetCalc: document.getElementById("btn-reset-calc-inputs"),
    // Input Kajian Kes
    inputExWorks: document.getElementById("input-exworks-price"),
    inputTruck: document.getElementById("input-truck-to-port"),
    inputExportClearance: document.getElementById("input-export-clearance"),
    inputOceanFreight: document.getElementById("input-ocean-freight"),
    inputInsurance: document.getElementById("input-cargo-insurance"),
    inputTokyoThc: document.getElementById("input-tokyo-thc"),
    inputImportDuty: document.getElementById("input-import-duty"),
    inputFinalDelivery: document.getElementById("input-final-delivery"),
    // Hasil Sebutharga
    calcValEXW: document.getElementById("calc-val-EXW"),
    calcValFOB: document.getElementById("calc-val-FOB"),
    calcValCIF: document.getElementById("calc-val-CIF"),
    calcValDDP: document.getElementById("calc-val-DDP"),
    calcCardEXW: document.getElementById("calc-card-EXW"),
    calcCardFOB: document.getElementById("calc-card-FOB"),
    calcCardCIF: document.getElementById("calc-card-CIF"),
    calcCardDDP: document.getElementById("calc-card-DDP"),
    
    // Kuiz
    quizGameplay: document.getElementById("quiz-gameplay-container"),
    quizResult: document.getElementById("quiz-result-container"),
    quizQuestionNum: document.getElementById("quiz-question-number-display"),
    quizScoreDisplay: document.getElementById("quiz-score-display"),
    quizDotsContainer: document.getElementById("quiz-progress-dots-container"),
    quizQuestionText: document.getElementById("quiz-question-text"),
    quizOptionsContainer: document.getElementById("quiz-options-container"),
    quizExplanationBox: document.getElementById("quiz-explanation-box"),
    quizExplanationTitle: document.getElementById("quiz-explanation-title"),
    quizExplanationText: document.getElementById("quiz-explanation-text"),
    btnNextQuestion: document.getElementById("btn-next-question"),
    btnRestartQuiz: document.getElementById("btn-restart-quiz"),
    certQuizScore: document.getElementById("cert-quiz-score"),
    
    // Panel Pensyarah & Modal
    btnLecturerModal: document.getElementById("btn-lecturer-modal-trigger"),
    modalLogin: document.getElementById("modal-lecturer-login"),
    modalPanel: document.getElementById("modal-lecturer-panel"),
    btnCloseLogin: document.getElementById("btn-close-login-modal"),
    btnClosePanel: document.getElementById("btn-close-panel-modal"),
    inputLecturerPass: document.getElementById("input-lecturer-password"),
    btnSubmitLecturerPass: document.getElementById("btn-submit-lecturer-password"),
    loginError: document.getElementById("lecturer-login-error"),
    // Kawalan Parameter Modal Pensyarah
    lectExWorks: document.getElementById("lect-exworks-price"),
    lectOceanFreight: document.getElementById("lect-ocean-freight"),
    lectImportDuty: document.getElementById("lect-import-duty"),
    btnUpdateLectParams: document.getElementById("btn-update-lect-params"),
    // Widgets Pensyarah
    widgetTotalStudents: document.getElementById("widget-total-students"),
    widgetAvgProgress: document.getElementById("widget-avg-progress"),
    widgetAvgQuiz: document.getElementById("widget-avg-quiz"),
    studentTableBody: document.getElementById("student-table-body"),
    btnExportCSV: document.getElementById("btn-export-students-csv"),
    btnResetClassData: document.getElementById("btn-reset-class-data"),
    // Togel Kunci
    toggleLockMod3: document.getElementById("toggle-lock-mod3"),
    toggleLockMod4: document.getElementById("toggle-lock-mod4"),
    toggleLockKuiz: document.getElementById("toggle-lock-kuiz"),
    
    // PDF Buttons & Printable Container
    btnDownloadPDFTop: document.getElementById("btn-download-pdf-top"),
    btnDownloadHandbook: document.getElementById("btn-download-handbook"),
    btnResetStudentProfile: document.getElementById("btn-reset-student-profile"),
    btnDownloadNotesEnd: document.getElementById("btn-download-notes-end"),
    printableHandbook: document.getElementById("academic-handbook-printable"),
    pdfTermsTableBody: document.getElementById("pdf-terms-table-body"),
    pdfCaseStudyParamsBody: document.getElementById("pdf-case-study-params-body"),
    pdfCalcEXWBox: document.getElementById("pdf-calc-EXW-box"),
    pdfCalcFOBBox: document.getElementById("pdf-calc-FOB-box"),
    pdfCalcCIFBox: document.getElementById("pdf-calc-CIF-box"),
    pdfCalcDDPBox: document.getElementById("pdf-calc-DDP-box")
  };

  // Sinkronisasikan profil pelajar aktif ke dalam senarai kelas
  function syncActiveStudentInList() {
    const existing = state.classStudents.find(s => s.id === "S01");
    if (existing) {
      existing.name = state.studentName;
    } else {
      state.classStudents = [{
        id: "S01",
        name: state.studentName,
        progress: 0,
        quizScore: 0,
        pdfDownloaded: "Belum",
        lastActive: "Baru tadi"
      }];
    }
  }

  // --- MEMULAKAN PLATFORM (INIT) ---
  function init() {
    // Muatkan data dari localStorage jika ada
    loadStateFromStorage();
    
    // Inisialisasikan senarai pelajar aktif sahaja
    syncActiveStudentInList();
    
    // Set teks pengenalan
    DOM.definitionText.textContent = IncotermsData.concept.definition;
    
    // Papar data dinamik Modul 1
    renderPillars();
    renderNotControlledList();
    renderUpdates2020();
    renderTimelineTicks();
    updateTimelineEvent(state.timelineIndex !== undefined ? state.timelineIndex : IncotermsData.timeline.length - 1);
    
    // Papar data dinamik Modul 2
    renderTermsGrid("all");
    selectTerm(state.activeTerm);
    
    // Papar data dinamik Modul 3
    renderSimulatorSelector();
    updateSimulatorVisuals(state.simSelectedTerm);
    
    // Muatkan data kajian kes dan hitung sebutharga
    resetCalculatorInputsToCaseStudy();
    renderCaseStudyParams();
    
    // Kemas kini progress bar
    updateProgress();
    
    // Siapkan data cetakan PDF
    preparePDFData();

    // Pastikan status sekat modul selaras
    applyModuleLocks();

    // Daftarkan semua Events
    registerEventListeners();
  }

  // --- PENGURUSAN STATE & STORAGE ---
  function saveStateToStorage() {
    localStorage.setItem("incoterms_student_name", state.studentName);
    localStorage.setItem("incoterms_progress", JSON.stringify({
      introRead: state.currentProgress.introRead,
      historyExplored: state.currentProgress.historyExplored,
      termsViewed: Array.from(state.currentProgress.termsViewed),
      simulationRuns: Array.from(state.currentProgress.simulationRuns),
      calculatorInteracted: state.currentProgress.calculatorInteracted,
      quizCompleted: state.currentProgress.quizCompleted
    }));
    localStorage.setItem("incoterms_locks", JSON.stringify(state.locks));
    localStorage.setItem("incoterms_case_study", JSON.stringify(state.caseStudyParams));
    localStorage.setItem("incoterms_quiz_score", state.quizState.score.toString());
    localStorage.setItem("incoterms_class_students", JSON.stringify(state.classStudents));
  }

  function loadStateFromStorage() {
    const savedName = localStorage.getItem("incoterms_student_name");
    if (savedName) {
      state.studentName = savedName;
      DOM.inputStudentName.value = savedName;
      DOM.certStudentName.textContent = savedName;
      DOM.pdfStudentName.textContent = savedName;
      DOM.nameCard.style.display = "none";
    }

    const savedProgress = localStorage.getItem("incoterms_progress");
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        state.currentProgress.introRead = parsed.introRead || false;
        state.currentProgress.historyExplored = parsed.historyExplored || false;
        state.currentProgress.termsViewed = new Set(parsed.termsViewed || []);
        state.currentProgress.simulationRuns = new Set(parsed.simulationRuns || []);
        state.currentProgress.calculatorInteracted = parsed.calculatorInteracted || false;
        state.currentProgress.quizCompleted = parsed.quizCompleted || false;
      } catch (e) {
        console.error("Gagal memuatkan progress", e);
      }
    }

    const savedLocks = localStorage.getItem("incoterms_locks");
    if (savedLocks) {
      try {
        state.locks = JSON.parse(savedLocks);
        DOM.toggleLockMod3.checked = state.locks.mod3;
        DOM.toggleLockMod4.checked = state.locks.mod4;
        DOM.toggleLockKuiz.checked = state.locks.kuiz;
      } catch (e) {
        console.error("Gagal memuatkan sekatan", e);
      }
    }

    const savedCaseStudy = localStorage.getItem("incoterms_case_study");
    if (savedCaseStudy) {
      try {
        state.caseStudyParams = JSON.parse(savedCaseStudy);
        DOM.lectExWorks.value = state.caseStudyParams.exWorksPrice;
        DOM.lectOceanFreight.value = state.caseStudyParams.oceanFreight;
        DOM.lectImportDuty.value = state.caseStudyParams.japanImportDuty;
      } catch (e) {
        console.error("Gagal memuatkan parameter kajian kes", e);
      }
    }
    
    const savedQuizScore = localStorage.getItem("incoterms_quiz_score");
    if (savedQuizScore) {
      state.quizState.score = parseInt(savedQuizScore) || 0;
      DOM.certQuizScore.textContent = `${state.quizState.score} / 100`;
    }

    const savedClassStudents = localStorage.getItem("incoterms_class_students");
    if (savedClassStudents) {
      try {
        state.classStudents = JSON.parse(savedClassStudents).filter(s => s.id === "S01");
      } catch (e) {
        console.error("Gagal memuatkan senarai pelajar kelas", e);
      }
    }
  }

  // --- KIRAAN KEMAJUAN PELAJAR ---
  function updateProgress() {
    let completedPoints = 0;
    let totalPoints = 15; // Definisi(1) + Sejarah(1) + 11 Terma viewed(11) + Simulator(1) + Calculator(1)

    if (state.currentProgress.introRead) completedPoints += 1;
    if (state.currentProgress.historyExplored) completedPoints += 1;
    
    // Setiap terma unik dibaca menyumbang mata
    completedPoints += Math.min(11, state.currentProgress.termsViewed.size);
    
    if (state.currentProgress.simulationRuns.size > 0) completedPoints += 1;
    if (state.currentProgress.calculatorInteracted) completedPoints += 1;

    const percentage = Math.round((completedPoints / totalPoints) * 100);
    DOM.progressBar.style.width = `${percentage}%`;
    DOM.progressText.textContent = `${percentage}%`;

    // Kemaskini progress pelajar aktif dalam mock data kelas
    const currentStudent = state.classStudents.find(s => s.name === state.studentName);
    if (currentStudent) {
      currentStudent.progress = percentage;
      if (state.currentProgress.quizCompleted) {
        currentStudent.quizScore = state.quizState.score;
      }
    }
    
    saveStateToStorage();
  }

  // --- APLIKASI KAWALAN KUNCI MODUL ---
  function applyModuleLocks() {
    // Mengawal status tab
    const tabMod3 = document.getElementById("tab-modul-3");
    const tabMod4 = document.getElementById("tab-modul-4");
    const tabKuiz = document.getElementById("tab-kuiz");
    
    const cardMod3 = document.getElementById("card-mod3");
    const cardMod4 = document.getElementById("card-mod4");

    if (state.locks.mod3) {
      tabMod3.classList.add("locked");
      cardMod3.classList.add("locked");
    } else {
      tabMod3.classList.remove("locked");
      cardMod3.classList.remove("locked");
    }

    if (state.locks.mod4) {
      tabMod4.classList.add("locked");
      cardMod4.classList.add("locked");
    } else {
      tabMod4.classList.remove("locked");
      cardMod4.classList.remove("locked");
    }

    if (state.locks.kuiz) {
      tabKuiz.classList.add("locked");
    } else {
      tabKuiz.classList.remove("locked");
    }
  }

  // --- PEMBINAAN COMPONENT DINAMIK ---

  // Modul 1: 3 Pilar
  function renderPillars() {
    DOM.pillarsContainer.innerHTML = "";
    IncotermsData.concept.pillars.forEach((p, idx) => {
      const card = document.createElement("div");
      card.className = `pillar-card ${idx === 0 ? "active" : ""}`;
      card.innerHTML = `
        <div class="pillar-card-icon">${p.icon}</div>
        <div class="pillar-card-content">
          <h4>${p.title}</h4>
          <p>${p.description}</p>
        </div>
      `;
      card.addEventListener("click", () => {
        document.querySelectorAll(".pillar-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        state.currentProgress.introRead = true;
        updateProgress();
      });
      DOM.pillarsContainer.appendChild(card);
    });
  }

  // Modul 1: Perkara tidak dikawal
  function renderNotControlledList() {
    DOM.notControlledList.innerHTML = "";
    IncotermsData.concept.notControlled.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      DOM.notControlledList.appendChild(li);
    });
  }

  // Modul 1: Garis masa sejarah ticks
  function renderTimelineTicks() {
    DOM.timelineTicks.innerHTML = "";
    IncotermsData.timeline.forEach((item, idx) => {
      const tick = document.createElement("span");
      tick.className = "timeline-tick-label";
      tick.textContent = item.year;
      tick.dataset.index = idx;
      tick.addEventListener("click", () => {
        DOM.timelineSlider.value = idx;
        updateTimelineEvent(idx);
      });
      DOM.timelineTicks.appendChild(tick);
    });
  }

  function updateTimelineEvent(idx) {
    const event = IncotermsData.timeline[idx];
    state.timelineIndex = idx;
    DOM.timelineYear.textContent = event.year;
    DOM.timelineText.textContent = event.event;
    
    // Aktifkan tick label semasa
    document.querySelectorAll(".timeline-tick-label").forEach((el, index) => {
      if (index === parseInt(idx)) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });

    if (idx > 0) {
      state.currentProgress.historyExplored = true;
      updateProgress();
    }
  }

  // Modul 1: Pelarasan 2020
  function renderUpdates2020() {
    DOM.updatesContainer.innerHTML = "";
    IncotermsData.updates2020.forEach(up => {
      const div = document.createElement("div");
      div.className = "update-2020-card";
      div.innerHTML = `
        <h4>${up.title}</h4>
        <p>${up.desc}</p>
      `;
      DOM.updatesContainer.appendChild(div);
    });
  }

  // Modul 2: Grid 11 Terma
  function renderTermsGrid(filter) {
    DOM.termsGrid.innerHTML = "";
    Object.values(IncotermsData.terms).forEach(term => {
      // Penapis logic
      if (filter !== "all") {
        if (filter === "multimodal" && term.mode !== "multimodal") return;
        if (filter === "sea" && term.mode !== "sea") return;
        if (["E", "F", "C", "D"].includes(filter) && term.group !== filter) return;
      }
      
      const card = document.createElement("div");
      const isViewed = state.currentProgress.termsViewed.has(term.code);
      card.className = `term-mini-card group-${term.group} ${term.code === state.activeTerm ? "active" : ""}`;
      card.innerHTML = `
        <div class="term-mini-header">
          <span class="term-mini-code">${term.code}</span>
          <span class="term-mini-group-badge badge-${term.group}">Kump. ${term.group}</span>
        </div>
        <div class="term-mini-name">${term.translation}</div>
        <div class="term-mini-meta">
          <span class="term-meta-tag ${term.mode}">${term.mode === "sea" ? "Laut" : "Multimodal"}</span>
          ${isViewed ? '<span style="color:var(--success); font-weight:bold;">✓ Dibaca</span>' : ''}
        </div>
      `;
      
      card.addEventListener("click", () => {
        document.querySelectorAll(".term-mini-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        selectTerm(term.code);
      });
      
      DOM.termsGrid.appendChild(card);
    });
  }

  // Modul 2: Klik Papar Detail Terma
  function selectTerm(code) {
    state.activeTerm = code;
    state.currentProgress.termsViewed.add(code);
    updateProgress();
    
    // Tandakan kad yang sudah dibaca
    const filter = document.querySelector(".filter-btn.active").dataset.filter;
    renderTermsGrid(filter);
    
    const term = IncotermsData.terms[code];
    const customsSummary = IncotermsData.customsSummary;
    
    DOM.termDetailSection.innerHTML = `
      <div class="term-detail-container">
        <div class="term-detail-header">
          <div class="term-detail-title">
            <h3>
              <span class="logo-badge" style="background:var(--pink);">${term.code}</span>
              ${term.name} - <span style="font-weight:600; font-size:1.1rem; color:var(--dark-light);">${term.translation}</span>
            </h3>
          </div>
          <span class="term-mini-group-badge badge-${term.group}" style="font-size:0.9rem; padding:6px 14px;">Kumpulan: ${term.group}</span>
        </div>
        
        <div class="term-detail-content-grid">
          <div class="detail-info-block responsibility">
            <h4>🔴 Tanggungjawab Penjual (Pengeksport)</h4>
            <p>${term.sellerResponsibility}</p>
          </div>
          
          <div class="detail-info-block" style="border-color:var(--baby-blue); background-color:var(--white);">
            <h4 style="color:var(--baby-blue-hover);">🔵 Tanggungjawab Pembeli (Pengimport)</h4>
            <p>${term.buyerResponsibility}</p>
          </div>
          
          <div class="detail-info-block">
            <h4>🛡️ Titik Pindahan Risiko</h4>
            <p>${term.riskPoint}</p>
          </div>
          
          <div class="detail-info-block">
            <h4>💰 Pembahagian Kos Transit</h4>
            <p>${term.costPoint}</p>
          </div>
          
          <div class="detail-info-block">
            <h4>🛂 Borang Kastam Eksport (K2)</h4>
            <p><strong>Diurus oleh:</strong> ${term.customsExport}</p>
            <p style="font-size:0.75rem; color:var(--dark-light); margin-top:4px;">Standard Borang K2 Malaysia: ${customsSummary.export.standard}</p>
          </div>
          
          <div class="detail-info-block">
            <h4>🛂 Borang Kastam Import (K1)</h4>
            <p><strong>Diurus oleh:</strong> ${term.customsImport}</p>
            <p style="font-size:0.75rem; color:var(--dark-light); margin-top:4px;">Standard Borang K1 Jepun: ${customsSummary.import.standard}</p>
          </div>
          
          <div class="detail-info-block academic-block">
            <h4>💡 Panduan Akademik Pensyarah (KK Papar)</h4>
            <p>${term.academicNote}</p>
          </div>
        </div>
      </div>
    `;
  }

  // Modul 3: Senarai Terma dalam Simulator
  function renderSimulatorSelector() {
    DOM.simTermsList.innerHTML = "";
    Object.keys(IncotermsData.terms).forEach(code => {
      const item = document.createElement("div");
      item.className = "pillar-card";
      item.style.padding = "8px 12px";
      item.style.margin = "0";
      item.style.borderRadius = "8px";
      item.dataset.code = code;
      item.innerHTML = `
        <div style="font-weight:800; font-size:1rem; color:var(--pink);">${code}</div>
        <div style="font-size:0.7rem; color:var(--dark-light);">${IncotermsData.terms[code].name}</div>
      `;
      item.addEventListener("click", () => {
        if (state.simRunning) return;
        document.querySelectorAll("#sim-terms-selector-list .pillar-card").forEach(c => c.classList.remove("active"));
        item.classList.add("active");
        updateSimulatorVisuals(code);
      });
      DOM.simTermsList.appendChild(item);
    });
    
    // Set default active term
    const defaultItem = DOM.simTermsList.querySelector(`[data-code="${state.simSelectedTerm}"]`);
    if (defaultItem) defaultItem.classList.add("active");
  }

  // Modul 3: Kemas kini Visual mengikut Terma Simulator
  function updateSimulatorVisuals(code) {
    state.simSelectedTerm = code;
    const term = IncotermsData.terms[code];
    
    DOM.simTermTitle.textContent = `${term.code} - ${term.name}`;
    DOM.simModeDisplay.textContent = `Mod Transit: ${term.mode === 'sea' ? 'Kapal Laut (Port-to-Port)' : 'Multimodal (Darat/Udara/Laut)'}`;
    
    // Kos and Risk Points Texts
    DOM.simCostPointText.textContent = term.costPoint;
    DOM.simRiskPointText.textContent = term.riskPoint;
    
    // Kastam Details
    DOM.simCustomsExportPihak.textContent = term.customsExport;
    DOM.simCustomsImportPihak.textContent = term.customsImport;
    
    // Reset stamps
    DOM.simCustomsExportStamp.className = "customs-stamp";
    DOM.simCustomsExportStamp.textContent = "BELUM DISAHKAN";
    DOM.simCustomsImportStamp.className = "customs-stamp";
    DOM.simCustomsImportStamp.textContent = "BELUM DISAHKAN";
    
    // Reset vehicle and indicators
    DOM.simVehicle.style.left = "20px";
    DOM.simRiskIndicator.style.display = "none";
    DOM.simCostSellerBar.style.width = "0%";
    DOM.simCostBuyerBar.style.width = "0%";
    
    // Kemaskini icon kenderaan
    if (term.mode === "sea") {
      DOM.simVehicle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-ship"><path d="M2 21h20"></path><path d="M19.3 14.8C21.1 13.5 22 11.7 22 10V4h-3v3H5V4H2v6c0 1.7.9 3.5 2.7 4.8L2 20h20l-2.7-5.2z"></path></svg>
      `;
    } else {
      DOM.simVehicle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-truck"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
      `;
    }
  }

  // Modul 3: Jalankan transit kargo
  function runTransitSimulation() {
    if (state.simRunning) return;
    state.simRunning = true;
    DOM.btnRunSimulation.disabled = true;
    DOM.btnRunSimulation.textContent = "Kargo Sedang Bergerak...";
    
    const code = state.simSelectedTerm;
    const term = IncotermsData.terms[code];
    
    // Set titik peratusan risiko dan kos bagi visualisasi
    let riskPercent = 5; // EXW
    let costSellerPercent = 5; // EXW
    
    if (code === "EXW") {
      riskPercent = 10;
      costSellerPercent = 10;
    } else if (code === "FAS") {
      riskPercent = 35; // Tepi kapal
      costSellerPercent = 35;
    } else if (code === "FOB") {
      riskPercent = 45; // Atas kapal
      costSellerPercent = 45; // Termasuk pemuatan
    } else if (code === "FCA") {
      riskPercent = 25; // Pengangkut pertama
      costSellerPercent = 25;
    } else if (["CPT", "CIP"].includes(code)) {
      riskPercent = 25; // Pengangkut pertama (risiko dipindah awal)
      costSellerPercent = 75; // Tetapi kos ditanggung hingga destinasi pelabuhan
    } else if (["CFR", "CIF"].includes(code)) {
      riskPercent = 45; // Risiko pindah atas kapal di negara asal
      costSellerPercent = 75; // Kos kapal dibayar hingga Tokyo port
    } else if (["DAP", "DPU"].includes(code)) {
      riskPercent = 85; // Destinasi (sebelum / selepas punggah)
      costSellerPercent = 85;
    } else if (code === "DDP") {
      riskPercent = 95; // Gudang pembeli
      costSellerPercent = 95;
    }

    // Jalankan Animasi Lori/Kapal
    // Kita anggap masa simulasi adalah 3 saat (3000ms)
    DOM.simVehicle.style.transition = "left 3.5s cubic-bezier(0.25, 0.8, 0.25, 1)";
    DOM.simCostSellerBar.style.transition = "width 3.5s cubic-bezier(0.25, 0.8, 0.25, 1)";
    DOM.simCostBuyerBar.style.transition = "width 3.5s cubic-bezier(0.25, 0.8, 0.25, 1)";
    
    // Mulakan pergerakan kenderaan
    setTimeout(() => {
      DOM.simVehicle.style.left = `calc(${riskPercent}% - 18px)`;
      DOM.simCostSellerBar.style.width = `${costSellerPercent}%`;
      DOM.simCostBuyerBar.style.width = `${100 - costSellerPercent}%`;
    }, 50);

    // Selepas separuh jalan, sahkan kastam eksport
    setTimeout(() => {
      DOM.simCustomsExportStamp.textContent = "TELAH DISAHKAN";
      DOM.simCustomsExportStamp.classList.add(term.customsExport.includes("Penjual") ? "seller-responsible" : "buyer-responsible");
    }, 1200);

    // Di titik risiko, paparkan penunjuk risiko
    setTimeout(() => {
      DOM.simRiskIndicator.style.left = `${riskPercent}%`;
      DOM.simRiskIndicator.style.display = "block";
      DOM.simRiskIndicator.textContent = `Risiko Berpindah (${term.code})`;
    }, 2000);

    // Selepas tiba di destinasi, sahkan kastam import
    setTimeout(() => {
      DOM.simCustomsImportStamp.textContent = "TELAH DISAHKAN";
      DOM.simCustomsImportStamp.classList.add(term.customsImport.includes("Penjual") ? "seller-responsible" : "buyer-responsible");
      
      // Jika EXW, lori terus ke hujung visual
      if (code !== "EXW") {
        DOM.simVehicle.style.left = "calc(95% - 18px)";
      }
    }, 2800);

    // Selesai simulasi
    setTimeout(() => {
      state.simRunning = false;
      DOM.btnRunSimulation.disabled = false;
      DOM.btnRunSimulation.textContent = "Jalankan Simulasi Transit";
      
      state.currentProgress.simulationRuns.add(code);
      updateProgress();
    }, 3600);
  }

  // Modul 4: Parameter Kajian Kes Asal (Ulasan akademik)
  function renderCaseStudyParams() {
    DOM.caseStudyList.innerHTML = "";
    
    const params = [
      { label: "Kuantiti Jam Tangan", val: `${state.caseStudyParams.quantity.toLocaleString()} unit` },
      { label: "Kos EXW Seunit", val: `RM ${state.caseStudyParams.exWorksPrice}` },
      { label: "Lori Tempatan (Penang Port)", val: `RM ${state.caseStudyParams.truckToPenang}` },
      { label: "Pelepasan Kastam Eksport (K2)", val: `RM ${state.caseStudyParams.exportClearance}` },
      { label: "Tambang Kapal Laut (ke Tokyo)", val: `RM ${state.caseStudyParams.oceanFreight}` },
      { label: "Polisi Insurans Kargo Laut", val: `RM ${state.caseStudyParams.insurance}` },
      { label: "Caj Pelabuhan Tokyo (THC)", val: `RM ${state.caseStudyParams.tokyoTHC}` },
      { label: "Duti Kastam Import Jepun", val: `RM ${state.caseStudyParams.japanImportDuty}` },
      { label: "Lori Gudang Akhir (Tokyo)", val: `RM ${state.caseStudyParams.finalDelivery}` }
    ];
    
    params.forEach(p => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${p.label}:</strong> ${p.val}`;
      DOM.caseStudyList.appendChild(li);
    });
  }

  // Modul 4: Isi input dan kalkulasi
  function resetCalculatorInputsToCaseStudy() {
    DOM.inputExWorks.value = state.caseStudyParams.exWorksPrice;
    DOM.inputTruck.value = state.caseStudyParams.truckToPenang;
    DOM.inputExportClearance.value = state.caseStudyParams.exportClearance;
    DOM.inputOceanFreight.value = state.caseStudyParams.oceanFreight;
    DOM.inputInsurance.value = state.caseStudyParams.insurance;
    DOM.inputTokyoThc.value = state.caseStudyParams.tokyoTHC;
    DOM.inputImportDuty.value = state.caseStudyParams.japanImportDuty;
    DOM.inputFinalDelivery.value = state.caseStudyParams.finalDelivery;

    // Reset styles
    document.querySelectorAll(".calc-input").forEach(input => {
      input.classList.remove("modified");
    });
    
    calculateQuotations();
  }

  function calculateQuotations() {
    // Ambil nilai input pelajar
    const qty = state.caseStudyParams.quantity;
    const exwPrice = parseFloat(DOM.inputExWorks.value) || 0;
    const truck = parseFloat(DOM.inputTruck.value) || 0;
    const exportClear = parseFloat(DOM.inputExportClearance.value) || 0;
    const ocean = parseFloat(DOM.inputOceanFreight.value) || 0;
    const ins = parseFloat(DOM.inputInsurance.value) || 0;
    const thc = parseFloat(DOM.inputTokyoThc.value) || 0;
    const importDuty = parseFloat(DOM.inputImportDuty.value) || 0;
    const finalDel = parseFloat(DOM.inputFinalDelivery.value) || 0;

    // Kira Skema Asal Berdasarkan Input
    const correctEXW = qty * exwPrice;
    const correctFOB = correctEXW + truck + exportClear;
    const correctCIF = correctFOB + ocean + ins;
    const correctDDP = correctCIF + thc + importDuty + finalDel;

    // Kemaskini Visual Paparan Sebutharga Pelajar
    DOM.calcValEXW.textContent = `RM ${correctEXW.toLocaleString()}`;
    DOM.calcValFOB.textContent = `RM ${correctFOB.toLocaleString()}`;
    DOM.calcValCIF.textContent = `RM ${correctCIF.toLocaleString()}`;
    DOM.calcValDDP.textContent = `RM ${correctDDP.toLocaleString()}`;

    // Kemaskini Formula Dinamik
    document.getElementById("calc-formula-EXW").textContent = `Formula: 1,000 unit × RM ${exwPrice} = RM ${correctEXW.toLocaleString()}`;
    document.getElementById("calc-formula-FOB").textContent = `Formula: EXW (RM ${correctEXW.toLocaleString()}) + Lori (RM ${truck}) + Kastam Eksport (RM ${exportClear}) = RM ${correctFOB.toLocaleString()}`;
    document.getElementById("calc-formula-CIF").textContent = `Formula: FOB (RM ${correctFOB.toLocaleString()}) + Tambang Kapal (RM ${ocean}) + Insurans (RM ${ins}) = RM ${correctCIF.toLocaleString()}`;
    document.getElementById("calc-formula-DDP").textContent = `Formula: CIF (RM ${correctCIF.toLocaleString()}) + Caj Pelabuhan (RM ${thc}) + Duti Jepun (RM ${importDuty}) + Lori Akhir (RM ${finalDel}) = RM ${correctDDP.toLocaleString()}`;

    // Tandakan interaksi kalkulator
    state.currentProgress.calculatorInteracted = true;
    updateProgress();
    
    // Kemaskini skema pdf
    preparePDFData();
  }

  // --- INTEGRASI KUIZ PERDANGANGAN ---
  function initQuiz() {
    state.quizState.currentQuestionIdx = 0;
    state.quizState.score = 0;
    state.quizState.answers = [];
    state.quizState.isAnswered = false;
    
    DOM.quizGameplay.style.display = "block";
    DOM.quizResult.style.display = "none";
    
    renderQuizProgressDots();
    showQuizQuestion();
  }

  function renderQuizProgressDots() {
    DOM.quizDotsContainer.innerHTML = "";
    IncotermsData.quizQuestions.forEach((_, idx) => {
      const dot = document.createElement("div");
      dot.className = "quiz-progress-dot";
      DOM.quizDotsContainer.appendChild(dot);
    });
  }

  function showQuizQuestion() {
    state.quizState.isAnswered = false;
    DOM.btnNextQuestion.style.display = "none";
    DOM.quizExplanationBox.style.display = "none";
    
    const idx = state.quizState.currentQuestionIdx;
    const question = IncotermsData.quizQuestions[idx];
    
    DOM.quizQuestionNum.textContent = `Soalan ${idx + 1} daripada ${IncotermsData.quizQuestions.length}`;
    DOM.quizScoreDisplay.textContent = `Skor: ${state.quizState.score} / 100`;
    
    // Kemaskini dot aktif
    const dots = document.querySelectorAll(".quiz-progress-dot");
    dots.forEach((dot, dotIdx) => {
      if (dotIdx === idx) {
        dot.className = "quiz-progress-dot active";
      }
    });

    DOM.quizQuestionText.textContent = question.question;
    DOM.quizOptionsContainer.innerHTML = "";
    
    question.options.forEach((opt, optIdx) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.innerHTML = `<span style="font-weight:700; margin-right:8px;">${String.fromCharCode(65 + optIdx)}.</span> ${opt}`;
      btn.addEventListener("click", () => {
        if (state.quizState.isAnswered) return;
        checkQuizAnswer(optIdx);
      });
      DOM.quizOptionsContainer.appendChild(btn);
    });
  }

  function checkQuizAnswer(selectedIdx) {
    state.quizState.isAnswered = true;
    const idx = state.quizState.currentQuestionIdx;
    const question = IncotermsData.quizQuestions[idx];
    const isCorrect = selectedIdx === question.correctAnswer;
    
    const options = DOM.quizOptionsContainer.querySelectorAll(".quiz-option-btn");
    const dots = document.querySelectorAll(".quiz-progress-dot");
    
    if (isCorrect) {
      state.quizState.score += 10;
      state.quizState.answers.push(true);
      options[selectedIdx].classList.add("correct");
      dots[idx].className = "quiz-progress-dot correct";
      DOM.quizExplanationTitle.innerHTML = "🎉 JAWAPAN TEPAT!";
      DOM.quizExplanationBox.style.borderColor = "#c6f6d5";
      DOM.quizExplanationBox.style.backgroundColor = "#f0fff4";
      DOM.quizExplanationTitle.style.color = "var(--success)";
    } else {
      state.quizState.answers.push(false);
      options[selectedIdx].classList.add("wrong");
      options[question.correctAnswer].classList.add("correct"); // Tunjukkan jawapan betul
      dots[idx].className = "quiz-progress-dot wrong";
      DOM.quizExplanationTitle.innerHTML = "❌ KEPUTUSAN KURANG TEPAT";
      DOM.quizExplanationBox.style.borderColor = "#fed7d7";
      DOM.quizExplanationBox.style.backgroundColor = "#fff5f5";
      DOM.quizExplanationTitle.style.color = "var(--error)";
    }

    DOM.quizExplanationText.textContent = question.explanation;
    DOM.quizExplanationBox.style.display = "block";
    DOM.quizScoreDisplay.textContent = `Skor: ${state.quizState.score} / 100`;
    
    // Tunjukkan butang seterusnya / selesai
    DOM.btnNextQuestion.style.display = "inline-flex";
    if (idx === IncotermsData.quizQuestions.length - 1) {
      DOM.btnNextQuestion.textContent = "Lihat Keputusan Akhir";
    } else {
      DOM.btnNextQuestion.textContent = "Soalan Seterusnya";
    }
  }

  function nextQuizStep() {
    const idx = state.quizState.currentQuestionIdx;
    if (idx < IncotermsData.quizQuestions.length - 1) {
      state.quizState.currentQuestionIdx += 1;
      showQuizQuestion();
    } else {
      // Selesai Kuiz!
      state.currentProgress.quizCompleted = true;
      updateProgress();
      
      DOM.quizGameplay.style.display = "none";
      DOM.quizResult.style.display = "block";
      DOM.certQuizScore.textContent = `${state.quizState.score} / 100`;
      
      // Kemaskini laporan pensyarah
      const currentStudent = state.classStudents.find(s => s.name === state.studentName);
      if (currentStudent) {
        currentStudent.quizScore = state.quizState.score;
      }
      
      saveStateToStorage();
    }
  }

  // --- PANEL KAWALAN PENSYARAH ---
  function checkLecturerLogin() {
    const pass = DOM.inputLecturerPass.value;
    if (pass === "pensyarah123") {
      DOM.loginError.style.display = "none";
      DOM.modalLogin.classList.remove("active");
      DOM.modalPanel.classList.add("active");
      DOM.inputLecturerPass.value = "";
      renderLecturerDashboard();
    } else {
      DOM.loginError.style.display = "block";
    }
  }

  function renderLecturerDashboard() {
    // Kirakan widget statistik kelas
    const total = state.classStudents.length;
    
    let sumProgress = 0;
    let sumQuiz = 0;
    let quizTakers = 0;

    state.classStudents.forEach(s => {
      sumProgress += s.progress;
      if (s.progress === 100 || s.quizScore > 0) {
        sumQuiz += s.quizScore;
        quizTakers++;
      }
    });

    const avgProgress = Math.round(sumProgress / total);
    const avgQuiz = quizTakers > 0 ? Math.round(sumQuiz / quizTakers) : 0;

    DOM.widgetTotalStudents.textContent = `${total} orang`;
    DOM.widgetAvgProgress.textContent = `${avgProgress}%`;
    DOM.widgetAvgQuiz.textContent = `${avgQuiz}%`;

    // Render Jadual Pelajar
    DOM.studentTableBody.innerHTML = "";
    state.classStudents.forEach(s => {
      const tr = document.createElement("tr");
      
      let progressBadge = `<span class="badge-status pending">${s.progress}%</span>`;
      if (s.progress === 100) {
        progressBadge = `<span class="badge-status completed">Selesai 100%</span>`;
      }
      
      let scoreText = s.quizScore > 0 ? `${s.quizScore} / 100` : `<span style="color:var(--dark-light); font-style:italic;">Belum Kuiz</span>`;
      
      let pdfBadge = s.pdfDownloaded === "Sudah" ? `<span class="badge-status downloaded">Muat Turun</span>` : `<span class="badge-status pending">Belum</span>`;

      tr.innerHTML = `
        <td>${s.id}</td>
        <td><strong>${s.name}</strong></td>
        <td>${progressBadge}</td>
        <td>${scoreText}</td>
        <td>${pdfBadge}</td>
        <td>${s.lastActive}</td>
      `;
      DOM.studentTableBody.appendChild(tr);
    });
  }

  // Eksport laporan data kelas ke CSV
  function exportClassDataToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID Pelajar,Nama Pelajar,Peratus Kemajuan (%),Skor Kuiz (100),Status Muat Turun PDF,Aktif Terakhir\r\n";
    
    state.classStudents.forEach(s => {
      csvContent += `${s.id},"${s.name}",${s.progress},${s.quizScore},${s.pdfDownloaded},${s.lastActive}\r\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Prestasi_Pelajar_Incoterms_SLK30203.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Mengubah parameter kajian kes oleh pensyarah
  function updateLecturerParams() {
    const exwVal = parseFloat(DOM.lectExWorks.value) || 0;
    const oceanVal = parseFloat(DOM.lectOceanFreight.value) || 0;
    const dutyVal = parseFloat(DOM.lectImportDuty.value) || 0;

    state.caseStudyParams.exWorksPrice = exwVal;
    state.caseStudyParams.oceanFreight = oceanVal;
    state.caseStudyParams.japanImportDuty = dutyVal;

    // Kemaskini pendaftaran kalkulator pelajar
    renderCaseStudyParams();
    resetCalculatorInputsToCaseStudy();

    alert("Berjaya! Parameter kajian kes telah dikemas kini untuk kelas logistik.");
    saveStateToStorage();
    DOM.modalPanel.classList.remove("active");
  }

  // Sifar semua data kelas
  function resetClassData() {
    const doReset = () => {
      // Sifarkan semua kemajuan pelajar dalam senarai kelas
      state.classStudents = state.classStudents.map(s => ({
        ...s,
        progress: 0,
        quizScore: 0,
        pdfDownloaded: "Belum"
      }));
      
      // Sifarkan kemajuan interaktif pelajar semasa
      state.currentProgress = {
        introRead: false,
        historyExplored: false,
        termsViewed: new Set(),
        simulationRuns: new Set(),
        calculatorInteracted: false,
        quizCompleted: false
      };
      state.quizState.score = 0;
      
      resetCalculatorInputsToCaseStudy();
      updateProgress();
      renderLecturerDashboard();
    };

    try {
      if (confirm("Adakah anda pasti untuk menetapkan semula kemajuan dan markah semua pelajar? Tindakan ini tidak boleh diundurkan.")) {
        doReset();
        alert("Kemajuan kelas logistik telah disifarkan semula.");
      }
    } catch (e) {
      console.warn("Fungsi confirm() disekat oleh pelayar, menjalankan tetapan semula secara terus.", e);
      doReset();
    }
  }

  // Reset Nama, Markah, dan Progress Pelajar
  function resetStudentProfile() {
    const doReset = () => {
      // 1. Reset Nama ke default
      state.studentName = "Pelajar SPL";
      DOM.inputStudentName.value = "Pelajar SPL";
      DOM.certStudentName.textContent = "Pelajar SPL";
      DOM.pdfStudentName.textContent = "Pelajar SPL";
      
      // Kembalikan kad input nama di skrin
      DOM.nameCard.style.display = "block";
      
      // 2. Sifarkan progress interaktif
      state.currentProgress = {
        introRead: false,
        historyExplored: false,
        termsViewed: new Set(),
        simulationRuns: new Set(),
        calculatorInteracted: false,
        quizCompleted: false
      };
      
      // 3. Sifarkan skor kuiz
      state.quizState.score = 0;
      state.quizState.currentQuestionIdx = 0;
      state.quizState.answers = [];
      state.quizState.isAnswered = false;
      
      // Hembunyikan paparan keputusan kuiz dan kembalikan ke permainan
      DOM.quizGameplay.style.display = "block";
      DOM.quizResult.style.display = "none";
      
      // Reset input kalkulator kepada kajian kes asal
      resetCalculatorInputsToCaseStudy();
      
      // Kemaskini nama pelajar ID S01 dalam table kembali ke default
      const s01 = state.classStudents.find(s => s.id === "S01");
      if (s01) {
        s01.name = "Ahmad Zaki bin Rosli";
      }
      
      // Hitung dan kemaskini progress visual
      updateProgress();
      
      // Lukis semula senarai kemajuan kelas
      renderLecturerDashboard();
    };

    try {
      if (confirm("Adakah anda pasti untuk menetapkan semula Nama Profil, Markah Kuiz, dan Kemajuan Pembelajaran anda ke 0%?")) {
        doReset();
        alert("Profil dan kemajuan anda telah disifarkan semula!");
      }
    } catch (e) {
      console.warn("Fungsi confirm() disekat, melakukan reset profil secara terus.", e);
      doReset();
    }
  }

  // --- PENYEDIAAN NOTA CETAKAN HANDBOOK PDF ---
  function preparePDFData() {
    // 1. Jadual 11 terma
    DOM.pdfTermsTableBody.innerHTML = "";
    Object.values(IncotermsData.terms).forEach(term => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${term.code}</strong></td>
        <td>${term.name}</td>
        <td>${term.translation}</td>
        <td>${term.mode === 'sea' ? 'Laut Sahaja' : 'Multimodal'}</td>
        <td>Grup ${term.group}</td>
      `;
      DOM.pdfTermsTableBody.appendChild(tr);
    });

    // 2. Kajian kes params
    DOM.pdfCaseStudyParamsBody.innerHTML = "";
    const caseStudyParamsList = [
      { label: "Bilangan Unit Jam Pintar", val: `${state.caseStudyParams.quantity} unit` },
      { label: "Kos Kilang (EXW) seunit", val: `RM ${state.caseStudyParams.exWorksPrice}` },
      { label: "Lori Tempatan ke Pelabuhan Pulau Pinang", val: `RM ${state.caseStudyParams.truckToPenang}` },
      { label: "Deklarasi Kastam Eksport (K2)", val: `RM ${state.caseStudyParams.exportClearance}` },
      { label: "Tambang Kapal Laut (Penang - Tokyo)", val: `RM ${state.caseStudyParams.oceanFreight}` },
      { label: "Polisi Insurans Kargo Laut", val: `RM ${state.caseStudyParams.insurance}` },
      { label: "Caj Pengendalian Pelabuhan Tokyo (THC)", val: `RM ${state.caseStudyParams.tokyoTHC}` },
      { label: "Duti Cukai Import Jepun (K1)", val: `RM ${state.caseStudyParams.japanImportDuty}` },
      { label: "Lori Gudang Akhir Tokyo ke gudang pembeli", val: `RM ${state.caseStudyParams.finalDelivery}` }
    ];

    caseStudyParamsList.forEach(p => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td><strong>${p.label}</strong></td><td>${p.val}</td>`;
      DOM.pdfCaseStudyParamsBody.appendChild(tr);
    });

    // 3. Formula & Keputusan Pengiraan Dinamik
    const qty = state.caseStudyParams.quantity;
    const exwPrice = state.caseStudyParams.exWorksPrice;
    const truck = state.caseStudyParams.truckToPenang;
    const exportClear = state.caseStudyParams.exportClearance;
    const ocean = state.caseStudyParams.oceanFreight;
    const ins = state.caseStudyParams.insurance;
    const thc = state.caseStudyParams.tokyoTHC;
    const importDuty = state.caseStudyParams.japanImportDuty;
    const finalDel = state.caseStudyParams.finalDelivery;

    const correctEXW = qty * exwPrice;
    const correctFOB = correctEXW + truck + exportClear;
    const correctCIF = correctFOB + ocean + ins;
    const correctDDP = correctCIF + thc + importDuty + finalDel;

    DOM.pdfCalcEXWBox.innerHTML = `
      <strong>1. Pengiraan Sebutharga EXW (Ex Works):</strong><br>
      Formula: Kuantiti &times; Kos Kilang seunit<br>
      Kiraan: ${qty.toLocaleString()} unit &times; RM ${exwPrice} = <strong>RM ${correctEXW.toLocaleString()}</strong><br>
      <em>Nota Akademik:</em> Pembeli mengambil kargo di kilang Pulau Pinang. Penjual menanggung kos sifar di luar pagar gudang.
    `;

    DOM.pdfCalcFOBBox.innerHTML = `
      <strong>2. Pengiraan Sebutharga FOB (Free on Board):</strong><br>
      Formula: Kos EXW + Lori Tempatan + Kastam Eksport (K2)<br>
      Kiraan: RM ${correctEXW.toLocaleString()} + RM ${truck} + RM ${exportClear} = <strong>RM ${correctFOB.toLocaleString()}</strong><br>
      <em>Nota Akademik:</em> Risiko dan kos dipindah kepada pembeli asing selepas kontena berada di atas kapal laut pelabuhan asal.
    `;

    DOM.pdfCalcCIFBox.innerHTML = `
      <strong>3. Pengiraan Sebutharga CIF (Cost, Insurance & Freight):</strong><br>
      Formula: Kos FOB + Tambang Kapal Laut + Insurans Kargo<br>
      Kiraan: RM ${correctFOB.toLocaleString()} + RM ${ocean} + RM ${ins} = <strong>RM ${correctCIF.toLocaleString()}</strong><br>
      <em>Nota Akademik:</em> Penjual membayar insurans minimum perlindungan kargo (C) bagi pihak pembeli. Risiko kerosakan laut ditanggung pembeli.
    `;

    DOM.pdfCalcDDPBox.innerHTML = `
      <strong>4. Pengiraan Sebutharga DDP (Delivered Duty Paid):</strong><br>
      Formula: Kos CIF + Caj Pelabuhan Tokyo + Cukai Import Jepun (K1) + Lori Domestik Jepun<br>
      Kiraan: RM ${correctCIF.toLocaleString()} + RM ${thc} + RM ${importDuty} + RM ${finalDel} = <strong>RM ${correctDDP.toLocaleString()}</strong><br>
      <em>Nota Akademik:</em> Penjual asing wajib menguruskan kastam import domestik Jepun. Kos landed cost paling tinggi.
    `;
  }

  // Logik menjana fail PDF secara dinamik
  function downloadHandbookPDF() {
    DOM.pdfStudentName.textContent = state.studentName;
    preparePDFData();

    // Tandakan dalam progress pelajar
    const currentStudent = state.classStudents.find(s => s.name === state.studentName);
    if (currentStudent) {
      currentStudent.pdfDownloaded = "Sudah";
    }
    updateProgress();

    // Cetak menggunakan fungsi cetakan asli pelayar (Save as PDF)
    window.print();
  }

  // --- REGISTER EVENT LISTENERS ---
  function registerEventListeners() {
    // 1. Tab switching
    DOM.tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const targetId = tab.dataset.target;
        
        // Semak locks
        if (targetId === "section-modul-3" && state.locks.mod3) {
          alert("Akses Disekat! Modul 3 (Simulasi Risiko) sedang dikunci oleh Pensyarah.");
          return;
        }
        if (targetId === "section-modul-4" && state.locks.mod4) {
          alert("Akses Disekat! Modul 4 (Kajian Kes Kos) sedang dikunci oleh Pensyarah.");
          return;
        }
        if (targetId === "section-kuiz" && state.locks.kuiz) {
          alert("Akses Ujian Disekat! Kuiz Uji Minda sedang dikunci oleh Pensyarah.");
          return;
        }

        // Tukar tab aktif
        DOM.tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // Tukar skrin
        DOM.sections.forEach(s => s.classList.remove("active"));
        document.getElementById(targetId).classList.add("active");

        // Set state pembacaan modul jika tab dibuka
        if (targetId === "section-modul-1") {
          state.currentProgress.introRead = true;
          updateProgress();
        }
        if (targetId === "section-kuiz" && !state.currentProgress.quizCompleted) {
          initQuiz();
        }
      });
    });

    // 1b. Module cards clicking (Teroka Modul)
    document.querySelectorAll(".module-card").forEach(card => {
      card.addEventListener("click", () => {
        const targetId = card.dataset.target;
        if (targetId) {
          const tab = document.querySelector(`.tab-btn[data-target="${targetId}"]`);
          if (tab) {
            tab.click();
          }
        }
      });
    });

    // 2. Mula belajar button
    DOM.btnStartLearning.addEventListener("click", () => {
      const tabMod1 = document.getElementById("tab-modul-1");
      if (tabMod1) tabMod1.click();
    });

    // 3. Simpan nama pelajar
    DOM.btnSaveStudentName.addEventListener("click", () => {
      const name = DOM.inputStudentName.value.trim();
      if (name.length > 0) {
        state.studentName = name;
        DOM.certStudentName.textContent = name;
        DOM.pdfStudentName.textContent = name;
        DOM.nameCard.style.display = "none";
        
        // Kemaskini nama pelajar aktif dalam senarai kelas
        syncActiveStudentInList();
        
        saveStateToStorage();
        updateProgress();
      }
    });

    // 4. Modul 1 Timeline Slider
    DOM.timelineSlider.addEventListener("input", (e) => {
      updateTimelineEvent(e.target.value);
    });

    DOM.btnPrevTimeline.addEventListener("click", () => {
      const val = parseInt(DOM.timelineSlider.value);
      if (val > 0) {
        DOM.timelineSlider.value = val - 1;
        updateTimelineEvent(val - 1);
      }
    });

    DOM.btnNextTimeline.addEventListener("click", () => {
      const val = parseInt(DOM.timelineSlider.value);
      if (val < IncotermsData.timeline.length - 1) {
        DOM.timelineSlider.value = val + 1;
        updateTimelineEvent(val + 1);
      }
    });

    // 5. Modul 2 Filters
    DOM.filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        DOM.filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderTermsGrid(btn.dataset.filter);
      });
    });

    // 6. Modul 3 Simulation Controls
    DOM.btnRunSimulation.addEventListener("click", () => {
      runTransitSimulation();
    });

    // 7. Modul 4 Calculator Inputs Live
    const inputs = [
      DOM.inputExWorks, DOM.inputTruck, DOM.inputExportClearance,
      DOM.inputOceanFreight, DOM.inputInsurance, DOM.inputTokyoThc,
      DOM.inputImportDuty, DOM.inputFinalDelivery
    ];

    inputs.forEach(input => {
      input.addEventListener("input", (e) => {
        // Tandakan input yang diubah sebagai modified untuk gaya visual
        const baseField = e.target.id.replace("input-", "");
        let fieldName = "";
        
        if (baseField === "exworks-price") fieldName = "exWorksPrice";
        else if (baseField === "truck-to-port") fieldName = "truckToPenang";
        else if (baseField === "export-clearance") fieldName = "exportClearance";
        else if (baseField === "cargo-insurance") fieldName = "insurance";
        else if (baseField === "tokyo-thc") fieldName = "tokyoTHC";
        else if (baseField === "import-duty") fieldName = "japanImportDuty";
        else if (baseField === "final-delivery") fieldName = "finalDelivery";
        else if (baseField === "ocean-freight") fieldName = "oceanFreight";

        if (fieldName && parseFloat(e.target.value) !== state.caseStudyParams[fieldName]) {
          e.target.classList.add("modified");
        } else {
          e.target.classList.remove("modified");
        }

        calculateQuotations();
      });
    });

    DOM.btnResetCalc.addEventListener("click", () => {
      resetCalculatorInputsToCaseStudy();
    });

    // 8. Quiz Controls
    DOM.btnNextQuestion.addEventListener("click", () => {
      nextQuizStep();
    });

    DOM.btnRestartQuiz.addEventListener("click", () => {
      initQuiz();
    });

    // 9. Lecturer Modal Login Toggle
    DOM.btnLecturerModal.addEventListener("click", () => {
      DOM.modalLogin.classList.add("active");
    });

    DOM.btnCloseLogin.addEventListener("click", () => {
      DOM.modalLogin.classList.remove("active");
      DOM.loginError.style.display = "none";
    });

    DOM.btnSubmitLecturerPass.addEventListener("click", () => {
      checkLecturerLogin();
    });

    DOM.inputLecturerPass.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        checkLecturerLogin();
      }
    });

    DOM.btnClosePanel.addEventListener("click", () => {
      DOM.modalPanel.classList.remove("active");
    });

    // Close on overlay click
    window.addEventListener("click", (e) => {
      if (e.target === DOM.modalLogin) {
        DOM.modalLogin.classList.remove("active");
        DOM.loginError.style.display = "none";
      }
      if (e.target === DOM.modalPanel) {
        DOM.modalPanel.classList.remove("active");
      }
    });

    // 10. Lecturer Controls
    DOM.btnUpdateLectParams.addEventListener("click", () => {
      updateLecturerParams();
    });

    DOM.btnExportCSV.addEventListener("click", () => {
      exportClassDataToCSV();
    });

    DOM.btnResetClassData.addEventListener("click", () => {
      resetClassData();
    });

    DOM.btnResetStudentProfile.addEventListener("click", () => {
      resetStudentProfile();
    });

    // Lock switches
    DOM.toggleLockMod3.addEventListener("change", (e) => {
      state.locks.mod3 = e.target.checked;
      applyModuleLocks();
      saveStateToStorage();
    });

    DOM.toggleLockMod4.addEventListener("change", (e) => {
      state.locks.mod4 = e.target.checked;
      applyModuleLocks();
      saveStateToStorage();
    });

    DOM.toggleLockKuiz.addEventListener("change", (e) => {
      state.locks.kuiz = e.target.checked;
      applyModuleLocks();
      saveStateToStorage();
    });

    // 11. PDF Download Buttons
    DOM.btnDownloadPDFTop.addEventListener("click", downloadHandbookPDF);
    DOM.btnDownloadHandbook.addEventListener("click", downloadHandbookPDF);
    DOM.btnDownloadNotesEnd.addEventListener("click", downloadHandbookPDF);
  }

  // Jalankan Init
  init();
});
