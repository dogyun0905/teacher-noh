const firebaseConfig = {
  apiKey: "AIzaSyCRULkhtusZR65leAKbLBN-Hj1JXrhTPQA",
  authDomain: "teacher-noh.firebaseapp.com",
  projectId: "teacher-noh",
  storageBucket: "teacher-noh.firebasestorage.app",
  messagingSenderId: "756290469824",
  appId: "1:756290469824:web:ffb1388973ff05e931d225"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 과목 데이터 및 규칙 (생략 없이 원본 유지)
const pageMapping = { '문학': 42, '대수': 55, '영어1': 72, '스포츠 생활 1': 138, '독서와 작문': 41, '미적분 1': 56, '영어 독해와 작문': 74, '스포츠 생활 2': 139, '스포츠 문화': 136, '스포츠 과학': 137, '문학과 영상': 44, '독서 토론과 글쓰기': 46, '주제 탐구 독서': 43, '언어생활 탐구': 48, '화법과 언어': 47, '언어생활과 한자': 201, '기하': 57, '경제 수학': 60, '인공지능 수학': 61, '미적분Ⅱ': 58, '수학과제 탐구': 65, '산업수학': 64, '확률과 통계': 57, '심화 영어': 77, '미디어 영어': 81, '세계 문화와 영어': 82, '실생활 영어 회화': 80, '영어 발표와 토론': 76, '영미 문학 읽기': 78, '심화 영어 독해와 작문': 79, '영어Ⅱ': 73, '인문학과 윤리': 101, '세계시민과 지리': 89, '경제': 86, '정치': 98, '사회문제 탐구': 104, '세계사': 90, '윤리와 사상': 100, '도시의 미래 탐구': 94, '사회와 문화': 91, '현대사회와 윤리': 92, '한국지리 탐구': 93, '기후변화와 지속가능한 세계': 106, '동아시아 역사 기행': 95, '역사로 탐구하는 현대 세계': 103, '법과 사회': 97, '윤리문제 탐구': 107, '금융과 경제생활': 105, '여행지리': 102, '물리학': 117, '화학': 118, '생명과학': 119, '지구과학': 120, '역학과 에너지': 121, '물질과 에너지': 123, '세포와 물질대사': 125, '지구시스템과학': 127, '기후변화와 환경생태': 130, '전자기와 양자': 122, '화학 반응의 세계': 124, '생물의 유전': 126, '행성우주과학': 128, '융합과학 탐구': 131, '프런티어 사이언스': 124, '정보': 159, '데이터 과학': 161, '창의공학설계': 154, '소프트웨어와 생활': 162, '정보과학': 154, '한문 고전 읽기': 192, '일본어': 171, '중국어': 170, '일본어 회화': 188, '중국어 회화': 187, '중국 문화': 196, '일본 문화': 197, '심화 중국어': 179, '심화 일본어': 180, '음악 감상과 비평': 145, '미술 감상과 비평': 147, '음악 연주와 창작': 144, '미술 창작': 146, '후마니타스': 202, '지속가능한 삶과 공동체 생활탐구': 203, '보건 진로 탐색': 204, '자기 주도적인 삶과 미래 역량 탐구': 205 };
const rules = { 2: { 1: { 'A': 4, 'C': 1 }, 2: { 'B': 4, 'D': 1 } }, 3: { 1: { 'E': 8, 'G': 1, 'I': 1 }, 2: { 'F': 8, 'H': 1, 'I': 1 } } };
const rawCourses = [ { id: 1001, grade: 2, semester: 1, group: '지정', name: '문학', desc: '필수' }, { id: 1002, grade: 2, semester: 1, group: '지정', name: '대수', desc: '필수' }, { id: 1003, grade: 2, semester: 1, group: '지정', name: '영어1', desc: '필수' }, { id: 1004, grade: 2, semester: 1, group: '지정', name: '스포츠 생활 1', desc: '필수' }, { id: 1005, grade: 2, semester: 2, group: '지정', name: '독서와 작문', desc: '필수' }, { id: 1006, grade: 2, semester: 2, group: '지정', name: '미적분 1', desc: '필수' }, { id: 1007, grade: 2, semester: 2, group: '지정', name: '영어 독해와 작문', desc: '필수' }, { id: 1008, grade: 2, semester: 2, group: '지정', name: '스포츠 생활 2', desc: '필수' }, { id: 1009, grade: 3, semester: 1, group: '지정', name: '스포츠 문화', desc: '필수' }, { id: 1010, grade: 3, semester: 2, group: '지정', name: '스포츠 과학', desc: '필수' }, { id: 9, grade: 2, semester: 1, group: 'A', name: '문학과 영상', desc: 'A군' }, { id: 10, grade: 2, semester: 1, group: 'A', name: '독서 토론과 글쓰기', desc: 'A군' }, { id: 11, grade: 2, semester: 1, group: 'A', name: '기하', desc: 'A군' }, { id: 12, grade: 2, semester: 1, group: 'A', name: '경제 수학', desc: 'A군' }, { id: 13, grade: 2, semester: 1, group: 'A', name: '심화 영어', desc: 'A군' }, { id: 14, grade: 2, semester: 1, group: 'A', name: '미디어 영어', desc: 'A군' }, { id: 15, grade: 2, semester: 1, group: 'A', name: '세계 문화와 영어', desc: 'A군' }, { id: 16, grade: 2, semester: 1, group: 'A', name: '실생활 영어 회화', desc: 'A군' }, { id: 17, grade: 2, semester: 1, group: 'A', name: '인문학과 윤리', desc: 'A군' }, { id: 18, grade: 2, semester: 1, group: 'A', name: '세계시민과 지리', desc: 'A군' }, { id: 19, grade: 2, semester: 1, group: 'A', name: '경제', desc: 'A군' }, { id: 20, grade: 2, semester: 1, group: 'A', name: '정치', desc: 'A군' }, { id: 21, grade: 2, semester: 1, group: 'A', name: '사회문제 탐구', desc: 'A군' }, { id: 22, grade: 2, semester: 1, group: 'A', name: '세계사', desc: 'A군' }, { id: 23, grade: 2, semester: 1, group: 'A', name: '물리학', desc: 'A군' }, { id: 24, grade: 2, semester: 1, group: 'A', name: '화학', desc: 'A군' }, { id: 25, grade: 2, semester: 1, group: 'A', name: '생명과학', desc: 'A군' }, { id: 26, grade: 2, semester: 1, group: 'A', name: '지구과학', desc: 'A군' }, { id: 27, grade: 2, semester: 1, group: 'A', name: '기후변화와 환경생태', desc: 'A군' }, { id: 28, grade: 2, semester: 1, group: 'A', name: '정보', desc: 'A군' }, { id: 29, grade: 2, semester: 1, group: 'A', name: '언어생활과 한자', desc: 'A군' }, { id: 30, grade: 2, semester: 2, group: 'B', name: '문학과 영상', desc: 'B군' }, { id: 31, grade: 2, semester: 2, group: 'B', name: '독서 토론과 글쓰기', desc: 'B군' }, { id: 32, grade: 2, semester: 2, group: 'B', name: '기하', desc: 'B군' }, { id: 33, grade: 2, semester: 2, group: 'B', name: '경제 수학', desc: 'B군' }, { id: 34, grade: 2, semester: 2, group: 'B', name: '인공지능 수학', desc: 'B군' }, { id: 35, grade: 2, semester: 2, group: 'B', name: '심화 영어', desc: 'B군' }, { id: 36, grade: 2, semester: 2, group: 'B', name: '미디어 영어', desc: 'B군' }, { id: 37, grade: 2, semester: 2, group: 'B', name: '세계 문화와 영어', desc: 'B군' }, { id: 38, grade: 2, semester: 2, group: 'B', name: '실생활 영어 회화', desc: 'B군' }, { id: 39, grade: 2, semester: 2, group: 'B', name: '윤리와 사상', desc: 'B군' }, { id: 40, grade: 2, semester: 2, group: 'B', name: '도시의 미래 탐구', desc: 'B군' }, { id: 41, grade: 2, semester: 2, group: 'B', name: '경제', desc: 'B군' }, { id: 42, grade: 2, semester: 2, group: 'B', name: '사회와 문화', desc: 'B군' }, { id: 43, grade: 2, semester: 2, group: 'B', name: '사회문제 탐구', desc: 'B군' }, { id: 44, grade: 2, semester: 2, group: 'B', name: '세계사', desc: 'B군' }, { id: 45, grade: 2, semester: 2, group: 'B', name: '물리학', desc: 'B군' }, { id: 46, grade: 2, semester: 2, group: 'B', name: '화학', desc: 'B군' }, { id: 47, grade: 2, semester: 2, group: 'B', name: '생명과학', desc: 'B군' }, { id: 48, grade: 2, semester: 2, group: 'B', name: '지구과학', desc: 'B군' }, { id: 49, grade: 2, semester: 2, group: 'B', name: '역학과 에너지', desc: 'B군' }, { id: 50, grade: 2, semester: 2, group: 'B', name: '물질과 에너지', desc: 'B군' }, { id: 51, grade: 2, semester: 2, group: 'B', name: '세포와 물질대사', desc: 'B군' }, { id: 52, grade: 2, semester: 2, group: 'B', name: '지구시스템과학', desc: 'B군' }, { id: 53, grade: 2, semester: 2, group: 'B', name: '기후변화와 환경생태', desc: 'B군' }, { id: 54, grade: 2, semester: 2, group: 'B', name: '데이터 과학', desc: 'B군' }, { id: 55, grade: 2, semester: 2, group: 'B', name: '한문 고전 읽기', desc: 'B군' }, { id: 56, grade: 2, semester: 1, group: 'C', name: '일본어', desc: 'C군' }, { id: 57, grade: 2, semester: 1, group: 'C', name: '중국어', desc: 'C군' }, { id: 58, grade: 2, semester: 2, group: 'D', name: '일본어 회화', desc: 'D군' }, { id: 59, grade: 2, semester: 2, group: 'D', name: '중국어 회화', desc: 'D군' }, { id: 60, grade: 3, semester: 1, group: 'E', name: '주제 탐구 독서', desc: 'E군' }, { id: 61, grade: 3, semester: 1, group: 'E', name: '언어생활 탐구', desc: 'E군' }, { id: 62, grade: 3, semester: 1, group: 'E', name: '화법과 언어', desc: 'E군' }, { id: 63, grade: 3, semester: 1, group: 'E', name: '미적분Ⅱ', desc: 'E군' }, { id: 64, grade: 3, semester: 1, group: 'E', name: '수학과제 탐구', desc: 'E군' }, { id: 65, grade: 3, semester: 1, group: 'E', name: '산업수학', desc: 'E군' }, { id: 66, grade: 3, semester: 1, group: 'E', name: '확률과 통계', desc: 'E군' }, { id: 67, grade: 3, semester: 1, group: 'E', name: '영어 발표와 토론', desc: 'E군' }, { id: 68, grade: 3, semester: 1, group: 'E', name: '영미 문학 읽기', desc: 'E군' }, { id: 69, grade: 3, semester: 1, group: 'E', name: '심화 영어 독해와 작문', desc: 'E군' }, { id: 70, grade: 3, semester: 1, group: 'E', name: '영어Ⅱ', desc: 'E군' }, { id: 71, grade: 3, semester: 1, group: 'E', name: '현대사회와 윤리', desc: 'E군' }, { id: 72, grade: 3, semester: 1, group: 'E', name: '한국지리 탐구', desc: 'E군' }, { id: 73, grade: 3, semester: 1, group: 'E', name: '기후변화와 지속가능한 세계', desc: 'E군' }, { id: 74, grade: 3, semester: 1, group: 'E', name: '동아시아 역사 기행', desc: 'E군' }, { id: 75, grade: 3, semester: 1, group: 'E', name: '역사로 탐구하는 현대 세계', desc: 'E군' }, { id: 76, grade: 3, semester: 1, group: 'E', name: '법과 사회', desc: 'E군' }, { id: 77, grade: 3, semester: 1, group: 'E', name: '후마니타스', desc: 'E군' }, { id: 78, grade: 3, semester: 1, group: 'E', name: '역학과 에너지', desc: 'E군' }, { id: 79, grade: 3, semester: 1, group: 'E', name: '물질과 에너지', desc: 'E군' }, { id: 80, grade: 3, semester: 1, group: 'E', name: '세포와 물질대사', desc: 'E군' }, { id: 81, grade: 3, semester: 1, group: 'E', name: '지구시스템과학', desc: 'E군' }, { id: 82, grade: 3, semester: 1, group: 'E', name: '전자기와 양자', desc: 'E군' }, { id: 83, grade: 3, semester: 1, group: 'E', name: '화학 반응의 세계', desc: 'E군' }, { id: 84, grade: 3, semester: 1, group: 'E', name: '생물의 유전', desc: 'E군' }, { id: 85, grade: 3, semester: 1, group: 'E', name: '행성우주과학', desc: 'E군' }, { id: 86, grade: 3, semester: 1, group: 'E', name: '융합과학 탐구', desc: 'E군' }, { id: 87, grade: 3, semester: 1, group: 'E', name: '프런티어 사이언스', desc: 'E군' }, { id: 88, grade: 3, semester: 1, group: 'E', name: '창의공학설계', desc: 'E군' }, { id: 89, grade: 3, semester: 1, group: 'E', name: '소프트웨어와 생활', desc: 'E군' }, { id: 90, grade: 3, semester: 1, group: 'E', name: '한문 고전 읽기', desc: 'E군' }, { id: 91, grade: 3, semester: 1, group: 'E', name: '중국 문화', desc: 'E군' }, { id: 92, grade: 3, semester: 1, group: 'E', name: '일본 문화', desc: 'E군' }, { id: 93, grade: 3, semester: 2, group: 'F', name: '주제 탐구 독서', desc: 'F군' }, { id: 94, grade: 3, semester: 2, group: 'F', name: '언어생활 탐구', desc: 'F군' }, { id: 95, grade: 3, semester: 2, group: 'F', name: '화법과 언어', desc: 'F군' }, { id: 96, grade: 3, semester: 2, group: 'F', name: '미적분Ⅱ', desc: 'F군' }, { id: 97, grade: 3, semester: 2, group: 'F', name: '수학과제 탐구', desc: 'F군' }, { id: 98, grade: 3, semester: 2, group: 'F', name: '산업수학', desc: 'F군' }, { id: 99, grade: 3, semester: 2, group: 'F', name: '확률과 통계', desc: 'F군' }, { id: 100, grade: 3, semester: 2, group: 'F', name: '영어 발표와 토론', desc: 'F군' }, { id: 101, grade: 3, semester: 2, group: 'F', name: '영미 문학 읽기', desc: 'F군' }, { id: 102, grade: 3, semester: 2, group: 'F', name: '심화 영어 독해와 작문', desc: 'F군' }, { id: 103, grade: 3, semester: 2, group: 'F', name: '영어Ⅱ', desc: 'F군' }, { id: 104, grade: 3, semester: 2, group: 'F', name: '윤리문제 탐구', desc: 'F군' }, { id: 105, grade: 3, semester: 2, group: 'F', name: '동아시아 역사 기행', desc: 'F군' }, { id: 106, grade: 3, semester: 2, group: 'F', name: '역사로 탐구하는 현대 세계', desc: 'F군' }, { id: 107, grade: 3, semester: 2, group: 'F', name: '금융과 경제생활', desc: 'F군' }, { id: 108, grade: 3, semester: 2, group: 'F', name: '여행지리', desc: 'F군' }, { id: 109, grade: 3, semester: 2, group: 'F', name: '후마니타스', desc: 'F군' }, { id: 110, grade: 3, semester: 2, group: 'F', name: '전자기와 양자', desc: 'F군' }, { id: 111, grade: 3, semester: 2, group: 'F', name: '화학 반응의 세계', desc: 'F군' }, { id: 112, grade: 3, semester: 2, group: 'F', name: '생물의 유전', desc: 'F군' }, { id: 113, grade: 3, semester: 2, group: 'F', name: '행성우주과학', desc: 'F군' }, { id: 114, grade: 3, semester: 2, group: 'F', name: '융합과학 탐구', desc: 'F군' }, { id: 115, grade: 3, semester: 2, group: 'F', name: '프런티어 사이언스', desc: 'F군' }, { id: 116, grade: 3, semester: 2, group: 'F', name: '창의공학설계', desc: 'F군' }, { id: 117, grade: 3, semester: 2, group: 'F', name: '정보과학', desc: 'F군' }, { id: 118, grade: 3, semester: 2, group: 'F', name: '언어생활과 한자', desc: 'F군' }, { id: 119, grade: 3, semester: 2, group: 'F', name: '심화 중국어', desc: 'F군' }, { id: 120, grade: 3, semester: 2, group: 'F', name: '심화 일본어', desc: 'F군' }, { id: 121, grade: 3, semester: 1, group: 'G', name: '음악 감상과 비평', desc: 'G군' }, { id: 122, grade: 3, semester: 1, group: 'G', name: '미술 감상과 비평', desc: 'G군' }, { id: 123, grade: 3, semester: 2, group: 'H', name: '음악 연주와 창작', desc: 'H군' }, { id: 124, grade: 3, semester: 2, group: 'H', name: '미술 창작', desc: 'H군' }, { id: 125, grade: 3, semester: 1, group: 'I', name: '지속가능한 삶과 공동체', desc: 'I군' }, { id: 126, grade: 3, semester: 2, group: 'I', name: '지속가능한 삶과 공동체', desc: 'I군' }, { id: 127, grade: 3, semester: 1, group: 'I', name: '보건 진로 탐색', desc: 'I군' }, { id: 128, grade: 3, semester: 2, group: 'I', name: '보건 진로 탐색', desc: 'I군' }, { id: 129, grade: 3, semester: 1, group: 'I', name: '미래 역량 탐구', desc: 'I군' }, { id: 130, grade: 3, semester: 2, group: 'I', name: '미래 역량 탐구', desc: 'I군' } ];
const courses = rawCourses.map(c => ({ ...c, pdfPage: pageMapping[c.name] || 1 }));

let currentUser = localStorage.getItem('currentUser') || null;
let currentGrade = parseInt(localStorage.getItem('currentGrade')) || 2;
let myEnrolledCourses = [];
let qaData = [];
let unsubscribeQA = null;

function init() { if (currentUser) { showApp(); } else { showLogin(); } }
function login() { const u = document.getElementById('username-input').value.trim(); const g = document.getElementById('grade-input').value; if (!u) return alert('이름을 입력하세요.'); currentUser = u; currentGrade = parseInt(g); localStorage.setItem('currentUser', u); localStorage.setItem('currentGrade', g); showApp(); }
function logout() { currentUser = null; localStorage.clear(); if (unsubscribeQA) unsubscribeQA(); showLogin(); }
function showLogin() { document.getElementById('login-container').style.display = 'block'; document.getElementById('app-container').style.display = 'none'; }
function showApp() { document.getElementById('login-container').style.display = 'none'; document.getElementById('app-container').style.display = 'block'; document.getElementById('user-greeting').innerText = currentUser === 'admin' ? '관리자 모드' : `${currentGrade}학년 ${currentUser}님`; showCourseView(); loadMyCoursesFromDB(); listenToQABoard(); }
function showQAView() { document.getElementById('course-view').style.display = 'none'; document.getElementById('qa-view').style.display = 'flex'; document.getElementById('nav-qa-btn').style.display = 'none'; document.getElementById('nav-course-btn').style.display = 'block'; document.getElementById('mobile-cart-btn').style.display = 'none'; }
function showCourseView() { document.getElementById('course-view').style.display = 'flex'; document.getElementById('qa-view').style.display = 'none'; document.getElementById('nav-qa-btn').style.display = 'block'; document.getElementById('nav-course-btn').style.display = 'none'; if(window.innerWidth <= 768) document.getElementById('mobile-cart-btn').style.display = 'flex'; }

function loadMyCoursesFromDB() {
    myEnrolledCourses = courses.filter(c => c.grade === currentGrade && c.group === '지정');
    if (currentUser === 'admin') return render();
    db.collection("users").doc(currentUser).get().then((doc) => {
        if (doc.exists) {
            const dbC = doc.data().courses || [];
            const validChoices = dbC.filter(e => e.group !== '지정' && e.grade === currentGrade && courses.some(v => v.id === e.id));
            myEnrolledCourses = [...myEnrolledCourses, ...validChoices];
        }
        render();
    });
}
function saveMyCoursesToDB() { if (currentUser !== 'admin') db.collection("users").doc(currentUser).set({ grade: currentGrade, courses: myEnrolledCourses }); }
function getEnrolledCount(s, g) { return myEnrolledCourses.filter(c => c.semester === s && c.group === g).length; }

function render() {
    const badge = document.getElementById('cart-count-badge'); if (badge) badge.innerText = myEnrolledCourses.length;
    const clist = document.getElementById('course-list'); const mylist = document.getElementById('my-courses');
    const key = document.getElementById('search-input').value.toLowerCase();
    clist.innerHTML = ''; mylist.innerHTML = '';

    const filtered = courses.filter(c => c.grade === currentGrade && c.name.toLowerCase().includes(key));
    if (filtered.length === 0) clist.innerHTML = '<p>결과가 없습니다.</p>';
    else {
        [1, 2].forEach(sem => {
            const semCourses = filtered.filter(c => c.semester === sem);
            if (semCourses.length > 0) {
                clist.innerHTML += `<div class="grade-header">${currentGrade}학년 ${sem}학기</div>`;
                let groups = ['지정', ...[...new Set(semCourses.map(c => c.group))].filter(g => g !== '지정')];
                groups.forEach(g => {
                    const gCourses = semCourses.filter(c => c.group === g);
                    if (gCourses.length > 0) {
                        const box = document.createElement('div'); box.className = 'group-box';
                        const cur = getEnrolledCount(sem, g); let max = 0;
                        if(g !== '지정' && rules[currentGrade][sem][g]) max = rules[currentGrade][sem][g];
                        const prog = g === '지정' ? '(필수)' : `(${cur}/${max})`;
                        box.innerHTML = `<div class="group-title"><span>${g==='지정'?'지정':`선택 ${g}군`}</span><span>${prog}</span></div>`;
                        const cards = document.createElement('div'); cards.className = 'group-cards';
                        gCourses.forEach(c => {
                            const isE = myEnrolledCourses.some(e => e.id === c.id);
                            let b = '';
                            if (g === '지정' || currentUser === 'admin') b = `<button class="btn-disabled" disabled>신청불가</button>`;
                            else if (isE) b = `<button class="btn-cancel" onclick="cancelCourse(${c.id})">취소</button>`;
                            else if (cur >= max) b = `<button class="btn-disabled" disabled>마감</button>`;
                            else b = `<button class="btn-enroll" onclick="enrollCourse(${c.id})">신청</button>`;
                            
                            const card = document.createElement('div'); card.className = 'card';
                            card.innerHTML = `<h4>${c.name}</h4><div class="button-group"><button class="btn-detail" onclick="showDetail(${c.id})">상세</button>${b}</div>`;
                            cards.appendChild(card);
                        });
                        box.appendChild(cards); clist.appendChild(box);
                    }
                });
            }
        });
    }

    [1, 2].forEach(sem => {
        const sc = myEnrolledCourses.filter(c => c.semester === sem);
        if (sc.length > 0) {
            mylist.innerHTML += `<div class="semester-header">${sem}학기 수강 목록</div>`;
            sc.forEach(c => {
                const item = document.createElement('div'); item.className = 'card';
                item.style.marginBottom = '10px';
                const isM = c.group === '지정';
                item.innerHTML = `<div><b>${c.name}</b></div><div style="font-size:12px;color:#888;">${isM?'필수지정':`선택 ${c.group}군`}</div>${!isM&&currentUser!=='admin'?`<button class="btn-cancel" onclick="cancelCourse(${c.id})" style="width:100%;margin-top:8px;padding:6px;">취소</button>`:''}`;
                mylist.appendChild(item);
            });
        }
    });
}

function enrollCourse(id) {
    const c = courses.find(v => v.id === id);
    if (myEnrolledCourses.some(e => e.name === c.name)) return alert('중복 신청 불가');
    myEnrolledCourses.push(c); saveMyCoursesToDB(); render();
}
function cancelCourse(id) { myEnrolledCourses = myEnrolledCourses.filter(e => e.id !== id); saveMyCoursesToDB(); render(); }
function submitCourses() { alert('모의 수강신청 제출이 완료되었습니다.'); }

// Q&A
function listenToQABoard() {
    if (unsubscribeQA) unsubscribeQA();
    unsubscribeQA = db.collection("qa").orderBy("timestamp", "desc").onSnapshot(s => {
        qaData = s.docs.map(d => ({ id: d.id, ...d.data() })); renderQA();
    });
}
function renderQA() {
    const list = document.getElementById('qa-list'); const form = document.getElementById('qa-form');
    if (currentUser === 'admin') form.innerHTML = '<p style="color:#0056b3;font-weight:bold;">관리자 답변 모드</p>';
    else form.innerHTML = `<input type="text" id="qa-t" placeholder="제목" style="width:100%;padding:10px;margin-bottom:10px;"><textarea id="qa-c" rows="4" style="width:100%;padding:10px;margin-bottom:10px;" placeholder="궁금한 내용을 남겨주세요."></textarea><div style="display:flex;justify-content:space-between;align-items:center;"><label style="cursor:pointer;"><input type="checkbox" id="qa-p" onchange="document.getElementById('qa-pw').style.display=this.checked?'block':'none'">비공개 설정</label><input type="password" id="qa-pw" placeholder="비밀번호" style="display:none;padding:5px;width:120px;"><button onclick="subQ()" style="background:#28a745;color:white;padding:10px 20px;border:none;border-radius:4px;font-weight:bold;cursor:pointer;">질문 등록</button></div>`;
    list.innerHTML = '';
    qaData.forEach(q => {
        const item = document.createElement('div'); item.className = 'qa-item';
        const isA = currentUser === 'admin';
        let del = isA ? `<button onclick="delQ('${q.id}')" style="background:#dc3545;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;font-size:12px;">삭제</button>` : '';
        if (q.isPrivate && !isA) {
            item.innerHTML = `<div class="qa-title"><span>🔒 비공개 질문입니다.</span>${del}</div><div id="lock-${q.id}" style="display:flex;gap:10px;"><input type="password" id="p-${q.id}" placeholder="비밀번호" style="padding:5px;"><button onclick="chkP('${q.id}','${q.password}')" style="padding:5px 10px;cursor:pointer;">확인</button></div><div id="open-${q.id}" style="display:none;"><div class="qa-content">${q.content}</div>${q.answer?`<div class="qa-answer"><b>답변:</b> ${q.answer}</div>`:'<p style="color:#888;">답변 대기 중</p>'}</div>`;
        } else {
            item.innerHTML = `<div class="qa-title"><span>${q.title} ${q.isPrivate?'(비공개)':''}</span>${del}</div><div class="qa-meta">${q.author} | ${q.date}</div><div class="qa-content">${q.content}</div>${q.answer?`<div class="qa-answer"><b>답변:</b> ${q.answer}</div>`:isA?`<div style="margin-top:10px;"><textarea id="ans-${q.id}" style="width:100%;" placeholder="답변을 입력하세요"></textarea><button onclick="subA('${q.id}')" style="background:#0056b3;color:white;border:none;padding:5px 15px;margin-top:5px;cursor:pointer;">답변 등록</button></div>`:'<p style="color:#888;">답변 대기 중</p>'}`;
        }
        list.appendChild(item);
    });
}
function subQ() {
    const t = document.getElementById('qa-t').value.trim(); const c = document.getElementById('qa-c').value.trim(); const p = document.getElementById('qa-p').checked; const pw = document.getElementById('qa-pw').value.trim();
    if (!t || !c || (p && !pw)) return alert('내용과 비밀번호를 확인하세요.');
    db.collection("qa").add({ author: currentUser, title: t, content: c, isPrivate: p, password: pw, date: new Date().toLocaleDateString(), timestamp: firebase.firestore.FieldValue.serverTimestamp(), answer: null }).then(()=>alert('질문이 등록되었습니다.'));
}
function subA(id) { const a = document.getElementById(`ans-${id}`).value.trim(); if (a) db.collection("qa").doc(id).update({ answer: a }); }
function delQ(id) { if (confirm('정말 삭제하시겠습니까?')) db.collection("qa").doc(id).delete(); }
function chkP(id, pw) { if (document.getElementById(`p-${id}`).value === pw) { document.getElementById(`lock-${id}`).style.display = 'none'; document.getElementById(`open-${id}`).style.display = 'block'; } else alert('비밀번호가 틀렸습니다.'); }

function showDetail(id) {
    const c = courses.find(v => v.id === id);
    document.getElementById('modal-title').innerText = c.name;
    document.getElementById('modal-category').innerText = `${c.grade}학년 / ${c.semester}학기 / ${c.group==='지정'?'필수':`선택 ${c.group}군`}`;
    document.getElementById('modal').style.display = 'block';
    if (window.renderPage) window.renderPage(c.pdfPage);
}
function closeModal() { document.getElementById('modal').style.display = 'none'; }
function toggleMobileCart() { document.getElementById('cart-section').classList.toggle('open'); document.getElementById('cart-overlay').classList.toggle('open'); }

try {
    const pdfjsLib = window.pdfjsLib;
    if (pdfjsLib) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
        let pdfDoc = null;
        pdfjsLib.getDocument('guide.pdf').promise.then(d => { pdfDoc = d; }).catch(e=>console.log("PDF 로드 실패"));
        window.renderPage = (n) => {
            if (!pdfDoc) return setTimeout(() => window.renderPage(n), 200);
            pdfDoc.getPage(n).then(p => {
                const can = document.getElementById('pdf-canvas'); const ctx = can.getContext('2d'); const v = p.getViewport({scale:1.5});
                can.height = v.height; can.width = v.width; p.render({canvasContext:ctx, viewport:v});
            });
        };
    }
} catch (e) {}

init();
document.getElementById('search-input').addEventListener('input', render);