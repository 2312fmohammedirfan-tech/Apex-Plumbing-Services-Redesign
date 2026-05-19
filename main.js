document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. STICKY HEADER & MOBILE NAV TOGGLE
     ========================================================================== */
  const header = document.querySelector('header');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('open');
      menuToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.textContent = '☰';
      });
    });

    // Close menu when clicking anywhere else
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('open');
        menuToggle.textContent = '☰';
      }
    });
  }

  /* ==========================================================================
     2. DYNAMIC TESTIMONIALS SLIDER CAROUSEL
     ========================================================================== */
  const slider = document.querySelector('.testimonials-slider');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const dotsContainer = document.querySelector('.slider-dots');

  if (slider && slides.length > 0) {
    let currentSlide = 0;

    // Create Navigation Dots
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    const updateSlider = () => {
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });
    };

    const goToSlide = (idx) => {
      currentSlide = idx;
      updateSlider();
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    };

    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
    };

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Auto rotate every 8 seconds
    let autoPlayInterval = setInterval(nextSlide, 8000);

    // Pause autoplay on mouse hover
    const sliderContainer = document.querySelector('.testimonials-slider-container');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
      sliderContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 8000);
      });
    }
  }

  /* ==========================================================================
     3. SERVICE PAGES SEARCH & FILTERS
     ========================================================================== */
  const serviceCards = document.querySelectorAll('.service-detail-item');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('serviceSearch');

  if (serviceCards.length > 0) {
    let activeFilter = 'all';
    let searchQuery = '';

    const filterServices = () => {
      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        const matchesCategory = activeFilter === 'all' || category === activeFilter;
        const matchesSearch = title.includes(searchQuery) || description.includes(searchQuery);

        if (matchesCategory && matchesSearch) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    };

    // Filter Buttons Click
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter');
        filterServices();
      });
    });

    // Search Input Typing
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterServices();
      });
    }
  }

  /* ==========================================================================
     4. INTERACTIVE MULTI-STEP BOOKING WIZARD
     ========================================================================== */
  const bookingWizard = document.getElementById('bookingWizard');
  
  if (bookingWizard) {
    const panels = document.querySelectorAll('.booking-wizard-step-panel');
    const steps = document.querySelectorAll('.wizard-steps .wizard-step');
    const progressBar = document.getElementById('wizardProgressBar');
    
    const prevStepBtn = document.getElementById('prevStepBtn');
    const nextStepBtn = document.getElementById('nextStepBtn');
    const submitBookingBtn = document.getElementById('submitBookingBtn');
    
    // User Selection State
    let bookingData = {
      service: '',
      servicePrice: '',
      date: '',
      time: '',
      name: '',
      email: '',
      phone: '',
      notes: ''
    };

    let currentStep = 1;
    const totalSteps = panels.length;

    // Handle Service Cards Selection
    const serviceOptions = document.querySelectorAll('.service-option-card');
    serviceOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        serviceOptions.forEach(card => card.classList.remove('selected'));
        opt.classList.add('selected');
        
        bookingData.service = opt.getAttribute('data-service');
        bookingData.servicePrice = opt.getAttribute('data-price');
        
        // Auto advance to Step 2 if user selected a service
        setTimeout(() => advanceStep(), 200);
      });
    });

    // Handle Time Slots Selection
    const timeSlots = document.querySelectorAll('.time-slot-btn');
    timeSlots.forEach(slot => {
      slot.addEventListener('click', () => {
        timeSlots.forEach(btn => btn.classList.remove('selected'));
        slot.classList.add('selected');
        bookingData.time = slot.getAttribute('data-time');
      });
    });

    // Check validation for current step
    const validateStep = (step) => {
      if (step === 1) {
        if (!bookingData.service) {
          alert('Please select a service before proceeding.');
          return false;
        }
      } else if (step === 2) {
        const dateInput = document.getElementById('bookingDate');
        bookingData.date = dateInput ? dateInput.value : '';
        
        if (!bookingData.date) {
          alert('Please select a preferred date.');
          return false;
        }
        if (!bookingData.time) {
          alert('Please select a preferred time slot.');
          return false;
        }
      } else if (step === 3) {
        const nameInput = document.getElementById('clientName');
        const emailInput = document.getElementById('clientEmail');
        const phoneInput = document.getElementById('clientPhone');
        const notesInput = document.getElementById('clientNotes');
        
        bookingData.name = nameInput ? nameInput.value.trim() : '';
        bookingData.email = emailInput ? emailInput.value.trim() : '';
        bookingData.phone = phoneInput ? phoneInput.value.trim() : '';
        bookingData.notes = notesInput ? notesInput.value.trim() : '';
        
        if (!bookingData.name) {
          alert('Please enter your full name.');
          return false;
        }
        if (!bookingData.phone) {
          alert('Please enter a valid phone number so we can reach you.');
          return false;
        }
        
        // Simple email regex check if provided
        if (bookingData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
          alert('Please enter a valid email address.');
          return false;
        }
      }
      return true;
    };

    // Update wizard displays
    const updateWizard = () => {
      // Manage Panel visibility
      panels.forEach((panel, idx) => {
        panel.classList.toggle('active', (idx + 1) === currentStep);
      });

      // Manage Step Progressive Circles
      steps.forEach((step, idx) => {
        const stepNum = idx + 1;
        step.classList.toggle('active', stepNum === currentStep);
        step.classList.toggle('completed', stepNum < currentStep);
      });

      // Progress Line
      const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
      if (progressBar) progressBar.style.width = `${progressPercent}%`;

      // Back Button Control
      if (prevStepBtn) {
        prevStepBtn.style.display = currentStep === 1 || currentStep === totalSteps ? 'none' : 'block';
      }

      // Next / Submit Buttons Control
      if (nextStepBtn && submitBookingBtn) {
        if (currentStep === totalSteps - 1) {
          nextStepBtn.style.display = 'none';
          submitBookingBtn.style.display = 'block';
        } else if (currentStep === totalSteps) {
          nextStepBtn.style.display = 'none';
          submitBookingBtn.style.display = 'none';
        } else {
          nextStepBtn.style.display = 'block';
          submitBookingBtn.style.display = 'none';
        }
      }

      // Populating Step 4 (Summary Screen)
      if (currentStep === 4) {
        document.getElementById('summaryService').textContent = bookingData.service;
        document.getElementById('summaryDate').textContent = bookingData.date;
        document.getElementById('summaryTime').textContent = bookingData.time;
        document.getElementById('summaryName').textContent = bookingData.name;
        document.getElementById('summaryPhone').textContent = bookingData.phone;
        document.getElementById('summaryPrice').textContent = bookingData.servicePrice;
      }
    };

    const advanceStep = () => {
      if (validateStep(currentStep)) {
        currentStep++;
        updateWizard();
      }
    };

    const stepBackward = () => {
      if (currentStep > 1) {
        currentStep--;
        updateWizard();
      }
    };

    if (nextStepBtn) {
      nextStepBtn.addEventListener('click', advanceStep);
    }
    if (prevStepBtn) {
      prevStepBtn.addEventListener('click', stepBackward);
    }

    // Submit Booking Form
    if (submitBookingBtn) {
      submitBookingBtn.addEventListener('click', () => {
        // Mock API Submit
        currentStep++;
        updateWizard();
      });
    }
    
    // Initialize wizard
    updateWizard();
  }
});
