document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Scroll-reveal Observer
  // =========================================================================
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => revealObserver.observe(el));

  // =========================================================================
  // 2. Custom Progress Bar Fill Animation
  // =========================================================================
  const progressFills = document.querySelectorAll('.progress-fill');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.getAttribute('data-progress');
        progressObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.05 });

  progressFills.forEach(el => progressObserver.observe(el));

  // =========================================================================
  // 3. Navbar Sticky Style Transition
  // =========================================================================
  const navbar = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  // =========================================================================
  // 4. Portfolio Filters
  // =========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const catalogGrid = document.getElementById('catalogGrid');
  const catalogItems = document.querySelectorAll('.catalog-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button states
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      catalogItems.forEach(item => {
        const category = item.getAttribute('data-category');

        if (filterVal === 'all' || category === filterVal) {
          item.style.display = 'block';
          // Force layout recalculation for entry animations
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 30);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.85)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // =========================================================================
  // 5. Tech Career Alignment Quiz (Matchmaker)
  // =========================================================================
  let currentStep = 1;
  const totalSteps = 3;
  const quizSlides = document.querySelectorAll('.quiz-slide');
  const quizProgress = document.getElementById('quizProgress');

  function updateQuizSlide() {
    quizSlides.forEach(slide => {
      slide.classList.remove('active');
      if (parseInt(slide.getAttribute('data-step')) === currentStep) {
        slide.classList.add('active');
      }
    });

    // Update horizontal indicator
    let pct = 33.3;
    if (currentStep === 1) pct = 33.3;
    else if (currentStep === 2) pct = 66.6;
    else if (currentStep >= 3) pct = 100;

    quizProgress.style.width = pct + '%';
  }

  // Next / Prev buttons
  document.querySelectorAll('.next-step-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < totalSteps) {
        currentStep++;
        updateQuizSlide();
      }
    });
  });

  document.querySelectorAll('.prev-step-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateQuizSlide();
      }
    });
  });

  // Quiz submission & logic
  document.getElementById('btnQuizSubmit')?.addEventListener('click', () => {
    calculateQuizMatch();
    currentStep = 4;
    updateQuizSlide();
  });

  // Quiz resetting
  document.getElementById('btnQuizReset')?.addEventListener('click', () => {
    currentStep = 1;
    updateQuizSlide();
  });

  function calculateQuizMatch() {
    const q1 = document.querySelector('input[name="q1"]:checked')?.value;
    const q2 = document.querySelector('input[name="q2"]:checked')?.value;
    const q3 = document.querySelector('input[name="q3"]:checked')?.value;

    let title = "";
    let desc = "";
    let skills = [];

    if (q1 === 'tabular') {
      if (q2 === 'predictive') {
        if (q3 === 'pipeline') {
          title = "Data Platform & Pipeline Engineer";
          desc = "You excel at building and optimizing data architectures. You enjoy modeling relational schemas and writing pipelines. Perfect for database-focused teams.";
          skills = ["SQL Optimization", "ETL Pipelines", "Data Warehousing", "Scikit-Learn"];
        } else {
          title = "Data Scientist & Statistician";
          desc = "You love interpreting rows and columns, drawing statistical conclusions, and training predictive models to answer critical questions. A perfect fit for research analyst roles.";
          skills = ["Pandas & NumPy", "Regression Models", "A/B Testing", "Tableau"];
        }
      } else { // generative
        if (q3 === 'pipeline') {
          title = "Enterprise AI Integration Architect";
          desc = "You focus on bringing large language models and prompt APIs together with structured enterprise pipelines, creating fast custom API integrations.";
          skills = ["FastAPI", "Vector Indexes", "LangChain", "PostgreSQL"];
        } else {
          title = "AI Business Systems Analyst";
          desc = "You optimize prompt variables, run benchmark evaluations, and align large tabular validation sets to model output accuracy. An ideal profile for AI product managers.";
          skills = ["Prompt Engineering", "Data Analytics", "Performance Metrics", "JSON Schema"];
        }
      }
    } else { // unstructured
      if (q2 === 'predictive') {
        if (q3 === 'pipeline') {
          title = "Machine Learning Platform Specialist";
          desc = "You construct deep-learning workflows designed to handle heavy multi-modal image, audio, or spatial layers. Excellent for GPU clustering teams.";
          skills = ["PyTorch", "TensorFlow", "Docker", "Model Quantization"];
        } else {
          title = "Spatial AI & Computer Vision Scientist";
          desc = "You analyze spatial layers, satellite grids, or acoustic frequencies to predict propagation paths. This mirrors Sahana's **Forest Fire propagation model** perfectly!";
          skills = ["Computer Vision", "Satellite Analytics", "PyTorch Modeling", "GIS Mapping"];
        }
      } else { // generative
        if (q3 === 'pipeline') {
          title = "Generative Audio/Video Engineer";
          desc = "You automate media generation steps, writing scripts that feed generative APIs to convert raw conceptual models into creative outputs.";
          skills = ["Stable Diffusion API", "Digital Signal Processing", "Python Scripts", "Flask"];
        } else {
          title = "Creative Coder & Interface Artist";
          desc = "You combine mathematical symmetries (like mandala coordinates) and acoustic vibes with modern frontend code, shaping gorgeous, responsive UX portfolios.";
          skills = ["Canvas API", "Radial Geometry", "CSS Animations", "Vanilla JS"];
        }
      }
    }

    const placeholder = document.getElementById('quizResultPlaceholder');
    if (placeholder) {
      placeholder.innerHTML = `
        <div class="text-center p-3 animate-fade-in">
          <h4 class="quiz-result-header text-gradient-crema mb-2">${title}</h4>
          <p class="quiz-result-description text-secondary mb-4">${desc}</p>
          <div class="d-flex flex-wrap justify-content-center gap-2">
            ${skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
          </div>
        </div>
      `;
    }
  }

  // =========================================================================
  // 6. Collaboration Booking Form (AJAX submission)
  // =========================================================================
  const bookingForm = document.getElementById('bookingForm');
  const successAlert = document.getElementById('bookingSuccess');

  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check Bootstrap validation
    if (!bookingForm.checkValidity()) {
      e.stopPropagation();
      bookingForm.classList.add('was-validated');
      return;
    }

    // Prepare booking payloads
    const payload = {
      name: document.getElementById('bookName').value,
      email: document.getElementById('bookEmail').value,
      date: document.getElementById('bookDate').value,
      session_type: document.getElementById('bookSessionType').value,
      duration: document.getElementById('bookGuests').value,
      time: document.getElementById('bookTime').value,
      notes: document.getElementById('bookNotes').value
    };

    const submitBtn = document.getElementById('btnBookSubmit');
    const originalBtnHTML = submitBtn.innerHTML;

    // Loading indicator on button
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Submitting Request <span class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>';

    fetch('/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit booking request');
      }
      return response.json();
    })
    .then(data => {
      // Success feedback
      successAlert.classList.remove('d-none');
      bookingForm.reset();
      bookingForm.classList.remove('was-validated');
      
      // Auto scroll to feedback
      successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Dismiss feedback after 7 seconds
      setTimeout(() => {
        successAlert.classList.add('d-none');
      }, 7000);
    })
    .catch(error => {
      console.error(error);
      alert('An error occurred. Please try again later.');
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    });
  });
});
