export type Language = 'en' | 'ar';

export const LANGUAGES: Language[] = ['en', 'ar'];
export const DEFAULT_LANGUAGE: Language = 'en';
export const STORAGE_KEY = 'qpet-lang';

type TranslationDict = Record<string, string>;

const en: TranslationDict = {
  // Navbar
  'nav.createProfile': 'Create Pet Profile',
  'nav.adoption': 'Adoption',
  'nav.mating': 'Mating',
  'nav.home': 'Home',

  // Footer
  'footer.tagline': 'Made with',
  'footer.taglineEnd': 'for pets everywhere',

  // Home page
  'home.badge': 'One pet. One page. One QR code.',
  'home.heroTitle': 'Give your pet a',
  'home.heroHighlight': 'digital identity',
  'home.heroDesc':
    "Qpet turns your pet's info into a shareable page with a QR code. Stick it on their tag -- anyone who scans it gets the full scoop and can contact you in seconds.",
  'home.createProfile': 'Create Pet Profile',
  'home.howItWorks': 'How it works',
  'home.stepsTitle': "Three steps. That's it.",
  'home.stepsDesc': 'From snap to scan in under a minute.',
  'home.step1Title': 'Create Your Pet Profile',
  'home.step1Desc':
    "Add your pet's information and create a digital profile for them.",
  'home.step2Title': 'Get Your QR Code',
  'home.step2Desc':
    "Your pet gets a unique QR code that you can attach to their collar or tag.",
  'home.step3Title': 'Scan & Find',
  'home.step3Desc':
    "If your pet gets lost, anyone who finds them can scan the QR code and reach their profile and contact information.",
  'home.step': 'Step',
  'home.feature1Title': 'No accounts, no fuss',
  'home.feature1Desc':
    'No sign-up, no login, no passwords. Just create a profile and share.',
  'home.feature2Title': 'A real digital ID',
  'home.feature2Desc':
    "Every pet gets their own beautiful page that looks great on any phone.",
  'home.feature3Title': 'Built for good humans',
  'home.feature3Desc':
    'If your furry friend ever wanders off, the finder can scan the code and contact you instantly.',
  'home.ctaTitle': 'Ready to tag your best friend?',
  'home.ctaDesc': "It's free, fun, and takes less than a minute.",

  // Create pet page
  'create.backHome': 'Back home',
  'create.newQpet': 'New Qpet',
  'create.title': 'Tell us about your pet',
  'create.desc':
    "Fill in the details below, add a photo, and we'll create a shareable page with a QR code. If your pet ever gets lost, whoever finds them can scan it and contact you instantly.",
  'create.petPhoto': 'Pet Photo',
  'create.petName': 'Pet Name',
  'create.petNamePh': 'e.g. Mochi, Biscuit, Captain Fluff...',
  'create.nameError': 'Your pet needs a name!',
  'create.nameLong': 'Keep the name under 60 characters.',
  'create.species': 'Species',
  'create.speciesError': 'Pick a species for your pet.',
  'create.photoError': 'Add a photo so people can recognize your pet.',
  'create.photoLarge': 'Photo is too large. Please choose one under 5MB.',
  'create.breed': 'Breed',
  'create.breedPh': 'e.g. Golden Retriever',
  'create.age': 'Age',
  'create.agePh': 'e.g. 3 years, 6 months',
  'create.gender': 'Gender',
  'create.color': 'Color',
  'create.colorPh': 'e.g. Cream with brown spots',
  'create.personality': 'Personality',
  'create.personalityPh': 'e.g. Friendly, energetic, loves kids',
  'create.description': 'Description',
  'create.descPh':
    'A little about your pet — quirks, favorite treats, special needs...',
  'create.location': 'Location',
  'create.locationPh': 'e.g. Cairo, Egypt',
  'create.ownerContact': 'Owner Contact',
  'create.ownerContactDesc':
    'So someone can reach you if they find your pet',
  'create.yourName': 'Your Name',
  'create.yourNamePh': 'e.g. Sarah Johnson',
  'create.nameRequired': 'Add your name so the finder knows who to contact.',
  'create.phoneNumber': 'Phone Number',
  'create.phonePh': 'e.g. +20 10 1234 5678',
  'create.phoneRequired':
    'Add at least a phone or WhatsApp number so people can reach you.',
  'create.whatsapp': 'WhatsApp',
  'create.contactInfo':
    'Add at least one contact method (phone or WhatsApp). This is what someone sees when they scan your pet\'s QR code.',
  'create.adoptionToggle': 'Available for Adoption',
  'create.adoptionToggleDesc':
    'Check this if your pet is looking for a new loving home. They will appear on the Adoption page.',
  'create.matingToggle': 'Available for Mating',
  'create.matingToggleDesc':
    'Check this if your pet is looking for a suitable mate. They will appear on the Mating page.',
  'create.weight': 'Weight',
  'create.weightPh': 'e.g. 25 kg',
  'create.vaccination': 'Vaccination Status',
  'create.vaccinationPh': 'e.g. Fully vaccinated',
  'create.submit': 'Create Qpet Profile',
  'create.creating': 'Creating...',
  'create.uploading': 'Uploading photo...',
  'creating.qr': 'Generating QR code...',
  'create.waitMsg':
    "Please don't close this page -- we're uploading the photo and creating the profile.",

  // QR result page
  'qr.ready': 'Your Qpet is ready!',
  'qr.readyDesc':
    "Scan the code to open {name}'s profile. Save it, print it, stick it on a tag.",
  'qr.scanAnyPhone': 'Scan with any phone camera',
  'qr.publicUrl': 'Public profile URL',
  'qr.download': 'Download QR',
  'qr.print': 'Print',
  'qr.viewProfile': 'View Profile',
  'qr.helper':
    "Print the QR code, laminate it, and attach it to your pet's collar or tag. If they ever wander off, whoever finds them can scan it and contact you right away.",
  'qr.backHome': 'Back to home',
  'qr.loading': 'Loading your Qpet...',
  'qr.wentWrong': 'Hmm, something went wrong',
  'qr.notFound': 'Pet profile not found.',
  'qr.newProfile': 'Create a new profile',

  // Public pet page
  'pet.notFound': 'Pet not found',
  'pet.notFoundDesc':
    "This QR code doesn't match any pet profile. The link may be old or incorrect.",
  'pet.visitQpet': 'Visit Qpet',
  'pet.wentWrong': 'Something went wrong',
  'pet.couldNotLoad': 'Could not load this profile.',
  'pet.loadingProfile': 'Loading pet profile...',
  'pet.contactOwner': 'Contact Owner',
  'pet.contact': 'Contact {name}',
  'pet.foundThisPet': 'Found this pet? Reach out right away so they can get home safe.',
  'pet.callOwner': 'Call Owner',
  'pet.whatsapp': 'WhatsApp',
  'pet.age': 'Age',
  'pet.gender': 'Gender',
  'pet.color': 'Color',
  'pet.personality': 'Personality',
  'pet.about': 'About',
  'pet.location': 'Location',
  'pet.owner': 'Owner',
  'pet.memberSince': 'Member since',
  'pet.identityBy': "This pet's digital identity by",
  'pet.keepPetsSafe': 'Keep pets safe. Tag them with Qpet.',
  'pet.availableForAdoption': 'Available for Adoption',
  'pet.availableForMating': 'Available for Mating',
  'pet.weight': 'Weight',
  'pet.vaccinationStatus': 'Vaccination Status',
  'pet.interestedInPet': 'Interested in this pet?',
  'pet.interestedDesc': 'Reach out to the owner to learn more and arrange a meeting.',

  // Adoption page
  'adoption.title': 'Find Your New Best Friend',
  'adoption.subtitle':
    'Every pet deserves a loving home. Browse pets available for adoption and reach out to their owners directly.',
  'adoption.searchPh': 'Search by name...',
  'adoption.allSpecies': 'All Species',
  'adoption.allGenders': 'All Genders',
  'adoption.allBreeds': 'All Breeds',
  'adoption.allAges': 'All Ages',
  'adoption.allLocations': 'All Locations',
  'adoption.filters': 'Filters',
  'adoption.results': '{count} pets available',
  'adoption.result': '{count} pet available',
  'adoption.noResults': 'No pets found',
  'adoption.noResultsDesc':
    'Try adjusting your search or filters to find more pets.',
  'adoption.clearFilters': 'Clear filters',
  'adoption.loading': 'Loading adoption pets...',
  'adoption.viewProfile': 'View Profile',
  'adoption.contactOwner': 'Contact Owner',
  'adoption.available': 'Available for Adoption',
  'adoption.breed': 'Breed',
  'adoption.age': 'Age',
  'adoption.gender': 'Gender',
  'adoption.location': 'Location',
  'adoption.unknown': 'Unknown',
  'adoption.about': 'About',

  // Mating page
  'mating.title': 'Find the Perfect Match for Your Pet',
  'mating.subtitle':
    'Connect your pet with compatible pets nearby.',
  'mating.searchPh': 'Search by name or breed...',
  'mating.petType': 'Pet Type',
  'mating.allTypes': 'All Types',
  'mating.breed': 'Breed',
  'mating.allBreeds': 'All Breeds',
  'mating.gender': 'Gender',
  'mating.allGenders': 'All Genders',
  'mating.age': 'Age',
  'mating.allAges': 'All Ages',
  'mating.location': 'Location',
  'mating.allLocations': 'All Locations',
  'mating.availableForMating': 'Available for Mating',
  'mating.filters': 'Filters',
  'mating.results': '{count} pets available',
  'mating.result': '{count} pet available',
  'mating.noResults': 'No matching pets found',
  'mating.noResultsDesc':
    'Try changing your filters or check back later.',
  'mating.clearFilters': 'Clear Filters',
  'mating.loading': 'Loading mating pets...',
  'mating.viewProfile': 'View Profile',
  'mating.contactOwner': 'Contact Owner',
  'mating.recommended': 'Recommended Matches',
  'mating.recommendedDesc':
    'Pets we think would make a great match based on type, breed, and age.',
  'mating.unknown': 'Unknown',

  // Image upload
  'upload.clickOrDrop': 'Click or drop a photo here',
  'upload.formats': 'JPG, PNG, or WebP — up to 5MB',
  'upload.looksGreat': 'Looks great! Click the X to change it.',

  // Auth
  'auth.loginTitle': 'Welcome back',
  'auth.loginSubtitle': 'Log in to manage your pets and their profiles.',
  'auth.registerTitle': 'Create your account',
  'auth.registerSubtitle': 'Join Qpet to create and manage your pet profiles.',
  'auth.fullName': 'Full Name',
  'auth.fullNamePh': 'e.g. Sarah Johnson',
  'auth.fullNameRequired': 'Please enter your full name.',
  'auth.fullNameTooShort': 'Name must be at least 2 characters.',
  'auth.email': 'Email',
  'auth.emailPh': 'you@example.com',
  'auth.emailRequired': 'Please enter your email.',
  'auth.invalidEmail': 'Please enter a valid email address.',
  'auth.password': 'Password',
  'auth.passwordPh': 'Enter your password',
  'auth.passwordRequired': 'Please enter a password.',
  'auth.passwordTooShort': 'Password must be at least 6 characters.',
  'auth.confirmPassword': 'Confirm Password',
  'auth.confirmPasswordPh': 'Re-enter your password',
  'auth.confirmRequired': 'Please confirm your password.',
  'auth.passwordMismatch': 'Passwords do not match.',
  'auth.rememberMe': 'Remember me',
  'auth.loginButton': 'Log In',
  'auth.registerButton': 'Create Account',
  'auth.noAccount': "Don't have an account?",
  'auth.registerLink': 'Sign up',
  'auth.haveAccount': 'Already have an account?',
  'auth.loginLink': 'Log in',
  'auth.backHome': 'Back to home',
  'auth.fillAllFields': 'Please fill in all fields.',
  'auth.registerEmailTaken': 'An account with this email already exists.',
  'auth.loginInvalid': 'Incorrect email or password.',
  'auth.emailNotConfirmed': 'Please confirm your email before logging in.',
  'auth.genericError': 'Something went wrong. Please try again.',
  'auth.registerSuccess': 'Account created!',
  'auth.registerSuccessDesc': 'Your Qpet account is ready. Log in to start adding pets.',
  'auth.goToLogin': 'Go to Login',
  'auth.loginRequired': 'You need to create an account or log in before adding a pet.',
  'auth.loginRequiredTitle': 'Login required',
  'auth.logout': 'Logout',

  // My pets
  'myPets.badge': 'Your pet family',
  'myPets.title': 'My Pets',
  'myPets.welcome': 'Welcome, {name}!',
  'myPets.searchPh': 'Search your pets...',
  'myPets.addPet': 'Add Pet',
  'myPets.loading': 'Loading your pets...',
  'myPets.retry': 'Try again',
  'myPets.empty': 'No pets yet',
  'myPets.emptyDesc': 'Create your first pet profile to get a QR code and share it with the world.',
  'myPets.noSearchResults': 'No matching pets',
  'myPets.noSearchDesc': 'Try a different search term.',
  'myPets.view': 'View',
  'myPets.edit': 'Edit',
  'myPets.delete': 'Delete',
  'myPets.deleteTitle': 'Delete this pet?',
  'myPets.deleteConfirm': 'This will permanently remove this pet profile. This action cannot be undone.',
  'myPets.cancel': 'Cancel',

  // Edit pet
  'edit.title': 'Edit Pet Profile',
  'edit.desc': 'Update your pet\u2019s details. Changes are saved instantly.',
  'edit.backToMyPets': 'Back to My Pets',
  'edit.save': 'Save Changes',
  'edit.saving': 'Saving...',
  'edit.notOwner': 'You can only edit pets that belong to you.',
  'edit.notFound': 'Pet not found.',
  'edit.loading': 'Loading pet for editing...',
  'edit.updated': 'Pet updated successfully!',

  // Language toggle
  'lang.en': 'EN',
  'lang.ar': 'AR',
};

const ar: TranslationDict = {
  // Navbar
  'nav.createProfile': 'إنشاء ملف حيوان أليف',
  'nav.adoption': 'تبني',
  'nav.mating': 'التزاوج',
  'nav.home': 'الرئيسية',

  // Footer
  'footer.tagline': 'صُنع بـ',
  'footer.taglineEnd': 'لكل الحيوانات الأليفة في كل مكان',

  // Home page
  'home.badge': 'حيوان واحد. صفحة واحدة. رمز QR واحد.',
  'home.heroTitle': 'أعطِ حيوانك الأليف',
  'home.heroHighlight': 'هوية رقمية',
  'home.heroDesc':
    'يحوّل Qpet معلومات حيوانك الأليف إلى صفحة قابلة للمشاركة مع رمز QR. الصقه على بطاقته — أي شخص يمسحه يحصل على كل المعلومات ويتواصل معك في ثوانٍ.',
  'home.createProfile': 'إنشاء ملف حيوان أليف',
  'home.howItWorks': 'كيف يعمل',
  'home.stepsTitle': 'ثلاث خطوات. هذا كل شيء.',
  'home.stepsDesc': 'من التصوير إلى المسح في أقل من دقيقة.',
  'home.step1Title': 'أنشئ ملف حيوانك الأليف',
  'home.step1Desc':
    'أضف معلومات حيوانك الأليف وأنشئ ملفًا رقميًا له.',
  'home.step2Title': 'احصل على رمز QR الخاص بك',
  'home.step2Desc':
    'يحصل حيوانك الأليف على رمز QR فريد يمكنك إرفاقه بطوقه أو بطاقته.',
  'home.step3Title': 'امسح واعثر',
  'home.step3Desc':
    'إذا ضاع حيوانك الأليف، يمكن لأي شخص يجده مسح رمز QR والوصول إلى ملفه ومعلومات التواصل.',
  'home.step': 'خطوة',
  'home.feature1Title': 'بدون حسابات، بدون متاعب',
  'home.feature1Desc':
    'بدون تسجيل، بدون دخول، بدون كلمات مرور. فقط أنشئ ملفًا وشاركه.',
  'home.feature2Title': 'هوية رقمية حقيقية',
  'home.feature2Desc':
    'كل حيوان أليف يحصل على صفحته الجميلة التي تبدو رائعة على أي هاتف.',
  'home.feature3Title': 'صُنع للبشر الطيبين',
  'home.feature3Desc':
    'إذا ضاع صديقك ذو الفراء، يمكن للشخص الذي يجده مسح الرمز والتواصل معك على الفور.',
  'home.ctaTitle': 'هل أنت مستعد لوضع بطاقة على صديقك المفضل؟',
  'home.ctaDesc': 'مجاني، ممتع، ويستغرق أقل من دقيقة.',

  // Create pet page
  'create.backHome': 'العودة للرئيسية',
  'create.newQpet': 'Qpet جديد',
  'create.title': 'أخبرنا عن حيوانك الأليف',
  'create.desc':
    'املأ التفاصيل أدناه، أضف صورة، وسننشئ صفحة قابلة للمشاركة مع رمز QR. إذا ضاع حيوانك الأليف، يمكن لمن يجده مسحه والتواصل معك على الفور.',
  'create.petPhoto': 'صورة الحيوان الأليف',
  'create.petName': 'اسم الحيوان الأليف',
  'create.petNamePh': 'مثال: موتشي، بسكويت، الكابتن فلوف...',
  'create.nameError': 'حيوانك الأليف يحتاج إلى اسم!',
  'create.nameLong': 'اجعل الاسم أقل من 60 حرفًا.',
  'create.species': 'النوع',
  'create.speciesError': 'اختر نوعًا لحيوانك الأليف.',
  'create.photoError': 'أضف صورة حتى يتمكن الناس من التعرف على حيوانك الأليف.',
  'create.photoLarge': 'الصورة كبيرة جدًا. يرجى اختيار صورة أقل من 5 ميجابايت.',
  'create.breed': 'السلالة',
  'create.breedPh': 'مثال: ريتريفر ذهبي',
  'create.age': 'العمر',
  'create.agePh': 'مثال: 3 سنوات، 6 أشهر',
  'create.gender': 'الجنس',
  'create.color': 'اللون',
  'create.colorPh': 'مثال: كريمي ببقع بنية',
  'create.personality': 'الشخصية',
  'create.personalityPh': 'مثال: ودود، نشيط، يحب الأطفال',
  'create.description': 'الوصف',
  'create.descPh':
    'قليل عن حيوانك الأليف — العادات، الأطعمة المفضلة، الاحتياجات الخاصة...',
  'create.location': 'الموقع',
  'create.locationPh': 'مثال: القاهرة، مصر',
  'create.ownerContact': 'معلومات المالك',
  'create.ownerContactDesc': 'حتى يتمكن شخص ما من الوصول إليك إذا وجد حيوانك الأليف',
  'create.yourName': 'اسمك',
  'create.yourNamePh': 'مثال: سارة جونسون',
  'create.nameRequired': 'أضف اسمك حتى يعرف من يجد حيوانك الأليف من يتواصل معه.',
  'create.phoneNumber': 'رقم الهاتف',
  'create.phonePh': 'مثال: +20 10 1234 5678',
  'create.phoneRequired': 'أضف رقم هاتف أو واتساب على الأقل حتى يتمكن الناس من التواصل معك.',
  'create.whatsapp': 'واتساب',
  'create.contactInfo':
    'أضف طريقة تواصل واحدة على الأقل (هاتف أو واتساب). هذا ما يراه الشخص عندما يمسح رمز QR لحيوانك الأليف.',
  'create.adoptionToggle': 'متاح للتبني',
  'create.adoptionToggleDesc':
    'حدد هذا الخيار إذا كان حيوانك الأليف يبحث عن منزل جديد محب. سيظهر في صفحة التبني.',
  'create.matingToggle': 'متاح للتزاوج',
  'create.matingToggleDesc':
    'حدد هذا الخيار إذا كان حيوانك الأليف يبحث عن شريك تزاوج مناسب. سيظهر في صفحة التزاوج.',
  'create.weight': 'الوزن',
  'create.weightPh': 'مثال: 25 كجم',
  'create.vaccination': 'حالة التطعيم',
  'create.vaccinationPh': 'مثال: تم تطعيمه بالكامل',
  'create.submit': 'إنشاء ملف Qpet',
  'create.creating': 'جاري الإنشاء...',
  'create.uploading': 'جاري رفع الصورة...',
  'creating.qr': 'جاري إنشاء رمز QR...',
  'create.waitMsg': 'يرجى عدم إغلاق هذه الصفحة — نحن نرفع الصورة ونعمل على إنشاء الملف.',

  // QR result page
  'qr.ready': 'Qpet الخاص بك جاهز!',
  'qr.readyDesc':
    'امسح الرمز لفتح ملف {name}. احفظه، اطبعه، الصقه على بطاقة.',
  'qr.scanAnyPhone': 'امسح بأي كاميرا هاتف',
  'qr.publicUrl': 'رابط الملف العام',
  'qr.download': 'تحميل رمز QR',
  'qr.print': 'طباعة',
  'qr.viewProfile': 'عرض الملف',
  'qr.helper':
    'اطبع رمز QR، غلفه بالبلاستيك، وألصقه ببطاقة حيوانك الأليف. إذا ضاع، يمكن لمن يجده مسحه والتواصل معك على الفور.',
  'qr.backHome': 'العودة للرئيسية',
  'qr.loading': 'جاري تحميل Qpet الخاص بك...',
  'qr.wentWrong': 'همم، حدث خطأ ما',
  'qr.notFound': 'لم يتم العثور على ملف الحيوان الأليف.',
  'qr.newProfile': 'إنشاء ملف جديد',

  // Public pet page
  'pet.notFound': 'لم يتم العثور على الحيوان الأليف',
  'pet.notFoundDesc':
    'هذا الرمز QR لا يطابق أي ملف حيوان أليف. قد يكون الرابط قديمًا أو غير صحيح.',
  'pet.visitQpet': 'زيارة Qpet',
  'pet.wentWrong': 'حدث خطأ ما',
  'pet.couldNotLoad': 'تعذر تحميل هذا الملف.',
  'pet.loadingProfile': 'جاري تحميل ملف الحيوان الأليف...',
  'pet.contactOwner': 'تواصل مع المالك',
  'pet.contact': 'تواصل مع {name}',
  'pet.foundThisPet': 'وجدت هذا الحيوان الأليف؟ تواصل على الفور حتى يعود بأمان.',
  'pet.callOwner': 'اتصل بالمالك',
  'pet.whatsapp': 'واتساب',
  'pet.age': 'العمر',
  'pet.gender': 'الجنس',
  'pet.color': 'اللون',
  'pet.personality': 'الشخصية',
  'pet.about': 'حول',
  'pet.location': 'الموقع',
  'pet.owner': 'المالك',
  'pet.memberSince': 'عضو منذ',
  'pet.identityBy': 'الهوية الرقمية لهذا الحيوان الأليف بواسطة',
  'pet.keepPetsSafe': 'حافظ على سلامة الحيوانات الأليفة. علّمها بـ Qpet.',
  'pet.availableForAdoption': 'متاح للتبني',
  'pet.availableForMating': 'متاح للتزاوج',
  'pet.weight': 'الوزن',
  'pet.vaccinationStatus': 'حالة التطعيم',
  'pet.interestedInPet': 'مهتم بهذا الحيوان الأليف؟',
  'pet.interestedDesc': 'تواصل مع المالك لمعرفة المزيد وترتيب لقاء.',

  // Adoption page
  'adoption.title': 'اعثر على صديقك المفضل الجديد',
  'adoption.subtitle':
    'كل حيوان أليف يستحق منزلًا محبًا. تصفّح الحيوانات المتاحة للتبني وتواصل مع مالكيها مباشرة.',
  'adoption.searchPh': 'ابحث بالاسم...',
  'adoption.allSpecies': 'كل الأنواع',
  'adoption.allGenders': 'كل الأجناس',
  'adoption.allBreeds': 'كل السلالات',
  'adoption.allAges': 'كل الأعمار',
  'adoption.allLocations': 'كل المواقع',
  'adoption.filters': 'الفلاتر',
  'adoption.results': '{count} حيوانات متاحة',
  'adoption.result': '{count} حيوان متاح',
  'adoption.noResults': 'لم يتم العثور على حيوانات',
  'adoption.noResultsDesc': 'حاول تعديل البحث أو الفلاتر للعثور على المزيد من الحيوانات.',
  'adoption.clearFilters': 'مسح الفلاتر',
  'adoption.loading': 'جاري تحميل حيوانات التبني...',
  'adoption.viewProfile': 'عرض الملف',
  'adoption.contactOwner': 'تواصل مع المالك',
  'adoption.available': 'متاح للتبني',
  'adoption.breed': 'السلالة',
  'adoption.age': 'العمر',
  'adoption.gender': 'الجنس',
  'adoption.location': 'الموقع',
  'adoption.unknown': 'غير معروف',
  'adoption.about': 'حول',

  // Mating page
  'mating.title': 'اعثر على الشريك المثالي لحيوانك الأليف',
  'mating.subtitle':
    'اربط حيوانك الأليف بحيوانات أليفة متوافقة بالقرب منك.',
  'mating.searchPh': 'ابحث بالاسم أو السلالة...',
  'mating.petType': 'نوع الحيوان',
  'mating.allTypes': 'كل الأنواع',
  'mating.breed': 'السلالة',
  'mating.allBreeds': 'كل السلالات',
  'mating.gender': 'الجنس',
  'mating.allGenders': 'كل الأجناس',
  'mating.age': 'العمر',
  'mating.allAges': 'كل الأعمار',
  'mating.location': 'الموقع',
  'mating.allLocations': 'كل المواقع',
  'mating.availableForMating': 'متاح للتزاوج',
  'mating.filters': 'الفلاتر',
  'mating.results': '{count} حيوانات متاحة',
  'mating.result': '{count} حيوان متاح',
  'mating.noResults': 'لم يتم العثور على حيوانات مطابقة',
  'mating.noResultsDesc':
    'حاول تغيير الفلاتر أو تحقق لاحقًا.',
  'mating.clearFilters': 'مسح الفلاتر',
  'mating.loading': 'جاري تحميل حيوانات التزاوج...',
  'mating.viewProfile': 'عرض الملف',
  'mating.contactOwner': 'تواصل مع المالك',
  'mating.recommended': 'التوافق الموصى به',
  'mating.recommendedDesc':
    'حيوانات أليفة نعتقد أنها ستكون مباراة رائعة بناءً على النوع والسلالة والعمر.',
  'mating.unknown': 'غير معروف',

  // Image upload
  'upload.clickOrDrop': 'انقر أو أسقط صورة هنا',
  'upload.formats': 'JPG أو PNG أو WebP — حتى 5 ميجابايت',
  'upload.looksGreat': 'تبدو رائعة! انقر على X لتغييرها.',

  // Auth
  'auth.loginTitle': 'مرحبًا بعودتك',
  'auth.loginSubtitle': 'سجّل الدخول لإدارة حيواناتك الأليفة وملفاتها.',
  'auth.registerTitle': 'أنشئ حسابك',
  'auth.registerSubtitle': 'انضم إلى Qpet لإنشاء وإدارة ملفات حيواناتك الأليفة.',
  'auth.fullName': 'الاسم الكامل',
  'auth.fullNamePh': 'مثال: سارة جونسون',
  'auth.fullNameRequired': 'يرجى إدخال اسمك الكامل.',
  'auth.fullNameTooShort': 'يجب أن يكون الاسم حرفين على الأقل.',
  'auth.email': 'البريد الإلكتروني',
  'auth.emailPh': 'you@example.com',
  'auth.emailRequired': 'يرجى إدخال بريدك الإلكتروني.',
  'auth.invalidEmail': 'يرجى إدخال بريد إلكتروني صالح.',
  'auth.password': 'كلمة المرور',
  'auth.passwordPh': 'أدخل كلمة المرور',
  'auth.passwordRequired': 'يرجى إدخال كلمة مرور.',
  'auth.passwordTooShort': 'يجب أن تكون كلمة المرور 6 أحرف على الأقل.',
  'auth.confirmPassword': 'تأكيد كلمة المرور',
  'auth.confirmPasswordPh': 'أعد إدخال كلمة المرور',
  'auth.confirmRequired': 'يرجى تأكيد كلمة المرور.',
  'auth.passwordMismatch': 'كلمتا المرور غير متطابقتين.',
  'auth.rememberMe': 'تذكرني',
  'auth.loginButton': 'تسجيل الدخول',
  'auth.registerButton': 'إنشاء حساب',
  'auth.noAccount': 'ليس لديك حساب؟',
  'auth.registerLink': 'سجّل الآن',
  'auth.haveAccount': 'لديك حساب بالفعل؟',
  'auth.loginLink': 'تسجيل الدخول',
  'auth.backHome': 'العودة للرئيسية',
  'auth.fillAllFields': 'يرجى ملء جميع الحقول.',
  'auth.registerEmailTaken': 'يوجد حساب بهذا البريد الإلكتروني بالفعل.',
  'auth.loginInvalid': 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
  'auth.emailNotConfirmed': 'يرجى تأكيد بريدك الإلكتروني قبل تسجيل الدخول.',
  'auth.genericError': 'حدث خطأ ما. حاول مرة أخرى.',
  'auth.registerSuccess': 'تم إنشاء الحساب!',
  'auth.registerSuccessDesc': 'حساب Qpet الخاص بك جاهز. سجّل الدخول لبدء إضافة الحيوانات الأليفة.',
  'auth.goToLogin': 'الذهاب لتسجيل الدخول',
  'auth.loginRequired': 'تحتاج إلى إنشاء حساب أو تسجيل الدخول قبل إضافة حيوان أليف.',
  'auth.loginRequiredTitle': 'تسجيل الدخول مطلوب',
  'auth.logout': 'تسجيل الخروج',

  // My pets
  'myPets.badge': 'عائلة حيواناتك الأليفة',
  'myPets.title': 'حيواناتي الأليفة',
  'myPets.welcome': 'مرحبًا، {name}!',
  'myPets.searchPh': 'ابحث في حيواناتك...',
  'myPets.addPet': 'إضافة حيوان أليف',
  'myPets.loading': 'جاري تحميل حيواناتك...',
  'myPets.retry': 'حاول مرة أخرى',
  'myPets.empty': 'لا توجد حيوانات أليفة بعد',
  'myPets.emptyDesc': 'أنشئ ملف حيوانك الأليف الأول للحصول على رمز QR ومشاركته مع العالم.',
  'myPets.noSearchResults': 'لا توجد نتائج مطابقة',
  'myPets.noSearchDesc': 'جرب كلمة بحث مختلفة.',
  'myPets.view': 'عرض',
  'myPets.edit': 'تعديل',
  'myPets.delete': 'حذف',
  'myPets.deleteTitle': 'حذف هذا الحيوان الأليف؟',
  'myPets.deleteConfirm': 'سيؤدي هذا إلى إزالة ملف الحيوان الأليف نهائيًا. لا يمكن التراجع عن هذا الإجراء.',
  'myPets.cancel': 'إلغاء',

  // Edit pet
  'edit.title': 'تعديل ملف الحيوان الأليف',
  'edit.desc': 'حدّث تفاصيل حيوانك الأليف. يتم حفظ التغييرات على الفور.',
  'edit.backToMyPets': 'العودة إلى حيواناتي',
  'edit.save': 'حفظ التغييرات',
  'edit.saving': 'جاري الحفظ...',
  'edit.notOwner': 'يمكنك تعديل الحيوانات الأليفة التي تخصك فقط.',
  'edit.notFound': 'لم يتم العثور على الحيوان الأليف.',
  'edit.loading': 'جاري تحميل الحيوان الأليف للتعديل...',
  'edit.updated': 'تم تحديث الحيوان الأليف بنجاح!',

  // Language toggle
  'lang.en': 'EN',
  'lang.ar': 'AR',
};

const translations: Record<Language, TranslationDict> = { en, ar };

export function translate(
  lang: Language,
  key: string,
  params?: Record<string, string | number>
): string {
  let str = translations[lang][key] ?? translations.en[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      str = str.replace(`{${k}}`, String(v));
    }
  }
  return str;
}
