// ▼▼▼ 1. 파이어베이스 설정 ▼▼▼
const firebaseConfig = {
  apiKey: "AIzaSyCRULkhtusZR65leAKbLBN-Hj1JXrhTPQA",
  authDomain: "teacher-noh.firebaseapp.com",
  projectId: "teacher-noh",
  storageBucket: "teacher-noh.firebasestorage.app",
  messagingSenderId: "756290469824",
  appId: "1:756290469824:web:ffb1388973ff05e931d225"
};

// 파이어베이스 중복 초기화 방지 및 연결
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
// ▲▲▲ 파이어베이스 설정 끝 ▲▲▲

// ▼▼▼ 2. PDF 페이지 매핑 데이터 ▼▼▼
const pageMapping = {
    '문학': 42, '대수': 55, '영어1': 72, '스포츠 생활 1': 138, '독서와 작문': 41, '미적분 1': 56, '영어 독해와 작문': 74, '스포츠 생활 2': 139, '스포츠 문화': 136, '스포츠 과학': 137,
    '문학과 영상': 44, '독서 토론과 글쓰기': 46, '주제 탐구 독서': 43, '언어생활 탐구': 48, '화법과 언어': 47, '언어생활과 한자': 201,
    '기하': 57, '경제 수학': 60, '인공지능 수학': 61, '미적분Ⅱ': 58, '수학과제 탐구': 65, '산업수학': 64, '확률과 통계': 57,
    '심화 영어': 77, '미디어 영어': 81, '세계 문화와 영어': 82, '실생활 영어 회화': 80, '영어 발표와 토론': 76, '영미 문학 읽기': 78, '심화 영어 독해와 작문': 79, '영어Ⅱ': 73,
    '인문학과 윤리': 101, '세계시민과 지리': 89, '경제': 86, '정치': 98, '사회문제 탐구': 104, '세계사': 90, '윤리와 사상': 100, '도시의 미래 탐구': 94, '사회와 문화': 91, '현대사회와 윤리': 92, '한국지리 탐구': 93, '기후변화와 지속가능한 세계': 106, '동아시아 역사 기행': 95, '역사로 탐구하는 현대 세계': 103, '법과 사회': 97, '윤리문제 탐구': 107, '금융과 경제생활': 105, '여행지리': 102,
    '물리학': 117, '화학': 118, '생명과학': 119, '지구과학': 120, '역학과 에너지': 121, '물질과 에너지': 123, '세포와 물질대사': 125, '지구시스템과학': 127, '기후변화와 환경생태': 130, '전자기와 양자': 122, '화학 반응의 세계': 124, '생물의 유전': 126, '행성우주과학': 128, '융합과학 탐구': 131, '프런티어 사이언스': 124,
    '정보': 159, '데이터 과학': 161, '창의공학설계': 154, '소프트웨어와 생활': 162, '정보과학': 154,
    '한문 고전 읽기': 192, '일본어': 171, '중국어': 170, '일본어 회화': 188, '중국어 회화': 187, '중국 문화': 196, '일본 문화': 197, '심화 중국어': 179, '심화 일본어': 180,
    '음악 감상과 비평': 145, '미술 감상과 비평': 147, '음악 연주와 창작': 144, '미술 창작': 146,
    '후마니타스': 202, '지속가능한 삶과 공동체 생활탐구': 203, '보건 진로 탐색': 204, '자기 주도적인 삶과 미래 역량 탐구': 205
};

const rules = {
    2: { 1: { 'A': 4, 'C': 1 }, 2: { 'B': 4, 'D': 1 } },
    3: { 1: { 'E': 8, 'G': 1, 'I': 1 }, 2: { 'F': 8, 'H': 1, 'I': 1 } }
};

// ▼▼▼ 3. 개설 과목 데이터 ▼▼▼
const rawCourses = [
    { id: 1001, grade: 2, semester: 1, group: '지정', name: '문학', desc: '필수 지정 과목입니다.' },
    { id: 1002, grade: 2, semester: 1, group: '지정', name: '대수', desc: '필수 지정 과목입니다.' },
    { id: 1003, grade: 2, semester: 1, group: '지정', name: '영어1', desc: '필수 지정 과목입니다.' },
    { id: 1004, grade: 2, semester: 1, group: '지정', name: '스포츠 생활 1', desc: '필수 지정 과목입니다.' },
    { id: 1005, grade: 2, semester: 2, group: '지정', name: '독서와 작문', desc: '필수 지정 과목입니다.' },
    { id: 1006, grade: 2, semester: 2, group: '지정', name: '미적분 1', desc: '필수 지정 과목입니다.' },
    { id: 1007, grade: 2, semester: 2, group: '지정', name: '영어 독해와 작문', desc: '필수 지정 과목입니다.' },
    { id: 1008, grade: 2, semester: 2, group: '지정', name: '스포츠 생활 2', desc: '필수 지정 과목입니다.' },
    { id: 1009, grade: 3, semester: 1, group: '지정', name: '스포츠 문화', desc: '필수 지정 과목입니다.' },
    { id: 1010, grade: 3, semester: 2, group: '지정', name: '스포츠 과학', desc: '필수 지정 과목입니다.' },
    
    { id: 9, grade: 2, semester: 1, group: 'A', name: '문학과 영상', desc: '문학과 영상 과목입니다.' },
    { id: 10, grade: 2, semester: 1, group: 'A', name: '독서 토론과 글쓰기', desc: '독서 토론과 글쓰기 과목입니다.' },
    { id: 11, grade: 2, semester: 1, group: 'A', name: '기하', desc: '기하 과목입니다.' },
    { id: 12, grade: 2, semester: 1, group: 'A', name: '경제 수학', desc: '경제 수학 과목입니다.' },
    { id: 13, grade: 2, semester: 1, group: 'A', name: '심화 영어', desc: '심화 영어 과목입니다.' },
    { id: 14, grade: 2, semester: 1, group: 'A', name: '미디어 영어', desc: '미디어 영어 과목입니다.' },
    { id: 15, grade: 2, semester: 1, group: 'A', name: '세계 문화와 영어', desc: '세계 문화와 영어 과목입니다.' },
    { id: 16, grade: 2, semester: 1, group: 'A', name: '실생활 영어 회화', desc: '실생활 영어 회화 과목입니다.' },
    { id: 17, grade: 2, semester: 1, group: 'A', name: '인문학과 윤리', desc: '인문학과 윤리 과목입니다.' },
    { id: 18, grade: 2, semester: 1, group: 'A', name: '세계시민과 지리', desc: '세계시민과 지리 과목입니다.' },
    { id: 19, grade: 2, semester: 1, group: 'A', name: '경제', desc: '경제 과목입니다.' },
    { id: 20, grade: 2, semester: 1, group: 'A', name: '정치', desc: '정치 과목입니다.' },
    { id: 21, grade: 2, semester: 1, group: 'A', name: '사회문제 탐구', desc: '사회문제 탐구 과목입니다.' },
    { id: 22, grade: 2, semester: 1, group: 'A', name: '세계사', desc: '세계사 과목입니다.' },
    { id: 23, grade: 2, semester: 1, group: 'A', name: '물리학', desc: '물리학 과목입니다.' },
    { id: 24, grade: 2, semester: 1, group: 'A', name: '화학', desc: '화학 과목입니다.' },
    { id: 25, grade: 2, semester: 1, group: 'A', name: '생명과학', desc: '생명과학 과목입니다.' },
    { id: 26, grade: 2, semester: 1, group: 'A', name: '지구과학', desc: '지구과학 과목입니다.' },
    { id: 27, grade: 2, semester: 1, group: 'A', name: '기후변화와 환경생태', desc: '기후변화와 환경생태 과목입니다.' },
    { id: 28, grade: 2, semester: 1, group: 'A', name: '정보', desc: '정보 과목입니다.' },
    { id: 29, grade: 2, semester: 1, group: 'A', name: '언어생활과 한자', desc: '언어생활과 한자 과목입니다.' },
    
    { id: 30, grade: 2, semester: 2, group: 'B', name: '문학과 영상', desc: '문학과 영상 과목입니다.' },
    { id: 31, grade: 2, semester: 2, group: 'B', name: '독서 토론과 글쓰기', desc: '독서 토론과 글쓰기 과목입니다.' },
    { id: 32, grade: 2, semester: 2, group: 'B', name: '기하', desc: '기하 과목입니다.' },
    { id: 33, grade: 2, semester: 2, group: 'B', name: '경제 수학', desc: '경제 수학 과목입니다.' },
    { id: 34, grade: 2, semester: 2, group: 'B', name: '인공지능 수학', desc: '인공지능 수학 과목입니다.' },
    { id: 35, grade: 2, semester: 2, group: 'B', name: '심화 영어', desc: '심화 영어 과목입니다.' },
    { id: 36, grade: 2, semester: 2, group: 'B', name: '미디어 영어', desc: '미디어 영어 과목입니다.' },
    { id: 37, grade: 2, semester: 2, group: 'B', name: '세계 문화와 영어', desc: '세계 문화와 영어 과목입니다.' },
    { id: 38, grade: 2, semester: 2, group: 'B', name: '실생활 영어 회화', desc: '실생활 영어 회화 과목입니다.' },
    { id: 39, grade: 2, semester: 2, group: 'B', name: '윤리와 사상', desc: '윤리와 사상 과목입니다.' },
    { id: 40, grade: 2, semester: 2, group: 'B', name: '도시의 미래 탐구', desc: '도시의 미래 탐구 과목입니다.' },
    { id: 41, grade: 2, semester: 2, group: 'B', name: '경제', desc: '경제 과목입니다.' },
    { id: 42, grade: 2, semester: 2, group: 'B', name: '사회와 문화', desc: '사회와 문화 과목입니다.' },
    { id: 43, grade: 2, semester: 2, group: 'B', name: '사회문제 탐구', desc: '사회문제 탐구 과목입니다.' },
    { id: 44, grade: 2, semester: 2, group: 'B', name: '세계사', desc: '세계사 과목입니다.' },
    { id: 45, grade: 2, semester: 2, group: 'B', name: '물리학', desc: '물리학 과목입니다.' },
    { id: 46, grade: 2, semester: 2, group: 'B', name: '화학', desc: '화학 과목입니다.' },
    { id: 47, grade: 2, semester: 2, group: 'B', name: '생명과학', desc: '생명과학 과목입니다.' },
    { id: 48, grade: 2, semester: 2, group: 'B', name: '지구과학', desc: '지구과학 과목입니다.' },
    { id: 49, grade: 2, semester: 2, group: 'B', name: '역학과 에너지', desc: '역학과 에너지 과목입니다.' },
    { id: 50, grade: 2, semester: 2, group: 'B', name: '물질과 에너지', desc: '물질과 에너지 과목입니다.' },
    { id: 51, grade: 2, semester: 2, group: 'B', name: '세포와 물질대사', desc: '세포와 물질대사 과목입니다.' },
    { id: 52, grade: 2, semester: 2, group: 'B', name: '지구시스템과학', desc: '지구시스템과학 과목입니다.' },
    { id: 53, grade: 2, semester: 2, group: 'B', name: '기후변화와 환경생태', desc: '기후변화와 환경생태 과목입니다.' },
    { id: 54, grade: 2, semester: 2, group: 'B', name: '데이터 과학', desc: '데이터 과학 과목입니다.' },
    { id: 55, grade: 2, semester: 2, group: 'B', name: '한문 고전 읽기', desc: '한문 고전 읽기 과목입니다.' },
    
    { id: 56, grade: 2, semester: 1, group: 'C', name: '일본어', desc: '일본어 과목입니다.' },
    { id: 57, grade: 2, semester: 1, group: 'C', name: '중국어', desc: '중국어 과목입니다.' },
    { id: 58, grade: 2, semester: 2, group: 'D', name: '일본어 회화', desc: '일본어 회화 과목입니다.' },
    { id: 59, grade: 2, semester: 2, group: 'D', name: '중국어 회화', desc: '중국어 회화 과목입니다.' },
    
    { id: 60, grade: 3, semester: 1, group: 'E', name: '주제 탐구 독서', desc: '주제 탐구 독서 과목입니다.' },
    { id: 61, grade: 3, semester: 1, group: 'E', name: '언어생활 탐구', desc: '언어생활 탐구 과목입니다.' },
    { id: 62, grade: 3, semester: 1, group: 'E', name: '화법과 언어', desc: '화법과 언어 과목입니다.' },
    { id: 63, grade: 3, semester: 1, group: 'E', name: '미적분Ⅱ', desc: '미적분Ⅱ 과목입니다.' },
    { id: 64, grade: 3, semester: 1, group: 'E', name: '수학과제 탐구', desc: '수학과제 탐구 과목입니다.' },
    { id: 65, grade: 3, semester: 1, group: 'E', name: '산업수학', desc: '산업수학 과목입니다.' },
    { id: 66, grade: 3, semester: 1, group: 'E', name: '확률과 통계', desc: '확률과 통계 과목입니다.' },
    { id: 67, grade: 3, semester: 1, group: 'E', name: '영어 발표와 토론', desc: '영어 발표와 토론 과목입니다.' },
    { id: 68, grade: 3, semester: 1, group: 'E', name: '영미 문학 읽기', desc: '영미 문학 읽기 과목입니다.' },
    { id: 69, grade: 3, semester: 1, group: 'E', name: '심화 영어 독해와 작문', desc: '심화 영어 독해와 작문 과목입니다.' },
    { id: 70, grade: 3, semester: 1, group: 'E', name: '영어Ⅱ', desc: '영어Ⅱ 과목입니다.' },
    { id: 71, grade: 3, semester: 1, group: 'E', name: '현대사회와 윤리', desc: '현대사회와 윤리 과목입니다.' },
    { id: 72, grade: 3, semester: 1, group: 'E', name: '한국지리 탐구', desc: '한국지리 탐구 과목입니다.' },
    { id: 73, grade: 3, semester: 1, group: 'E', name: '기후변화와 지속가능한 세계', desc: '기후변화와 지속가능한 세계 과목입니다.' },
    { id: 74, grade: 3, semester: 1, group: 'E', name: '동아시아 역사 기행', desc: '동아시아 역사 기행 과목입니다.' },
    { id: 75, grade: 3, semester: 1, group: 'E', name: '역사로 탐구하는 현대 세계', desc: '역사로 탐구하는 현대 세계 과목입니다.' },
    { id: 76, grade: 3, semester: 1, group: 'E', name: '법과 사회', desc: '법과 사회 과목입니다.' },
    { id: 77, grade: 3, semester: 1, group: 'E', name: '후마니타스', desc: '후마니타스 과목입니다.' },
    { id: 78, grade: 3, semester: 1, group: 'E', name: '역학과 에너지', desc: '역학과 에너지 과목입니다.' },
    { id: 79, grade: 3, semester: 1, group: 'E', name: '물질과 에너지', desc: '물질과 에너지 과목입니다.' },
    { id: 80, grade: 3, semester: 1, group: 'E', name: '세포와 물질대사', desc: '세포와 물질대사 과목입니다.' },
    { id: 81, grade: 3, semester: 1, group: 'E', name: '지구시스템과학', desc: '지구시스템과학 과목입니다.' },
    { id: 82, grade: 3, semester: 1, group: 'E', name: '전자기와 양자', desc: '전자기와 양자 과목입니다.' },
    { id: 83, grade: 3, semester: 1, group: 'E', name: '화학 반응의 세계', desc: '화학 반응의 세계 과목입니다.' },
    { id: 84, grade: 3, semester: 1, group: 'E', name: '생물의 유전', desc: '생물의 유전 과목입니다.' },
    { id: 85, grade: 3, semester: 1, group: 'E', name: '행성우주과학', desc: '행성우주과학 과목입니다.' },
    { id: 86, grade: 3, semester: 1, group: 'E', name: '융합과학 탐구', desc: '융합과학 탐구 과목입니다.' },
    { id: 87, grade: 3, semester: 1, group: 'E', name: '프런티어 사이언스', desc: '프런티어 사이언스 과목입니다.' },
    { id: 88, grade: 3, semester: 1, group: 'E', name: '창의공학설계', desc: '창의공학설계 과목입니다.' },
    { id: 89, grade: 3, semester: 1, group: 'E', name: '소프트웨어와 생활', desc: '소프트웨어와 생활 과목입니다.' },
    { id: 90, grade: 3, semester: 1, group: 'E', name: '한문 고전 읽기', desc: '한문 고전 읽기 과목입니다.' },
    { id: 91, grade: 3, semester: 1, group: 'E', name: '중국 문화', desc: '중국 문화 과목입니다.' },
    { id: 92, grade: 3, semester: 1, group: 'E', name: '일본 문화', desc: '일본 문화 과목입니다.' },
    
    { id: 93, grade: 3, semester: 2, group: 'F', name: '주제 탐구 독서', desc: '주제 탐구 독서 과목입니다.' },
    { id: 94, grade: 3, semester: 2, group: 'F', name: '언어생활 탐구', desc: '언어생활 탐구 과목입니다.' },
    { id: 95, grade: 3, semester: 2, group: 'F', name: '화법과 언어', desc: '화법과 언어 과목입니다.' },
    { id: 96, grade: 3, semester: 2, group: 'F', name: '미적분Ⅱ', desc: '미적분Ⅱ 과목입니다.' },
    { id: 97, grade: 3, semester: 2, group: 'F', name: '수학과제 탐구', desc: '수학과제 탐구 과목입니다.' },
    { id: 98, grade: 3, semester: 2, group: 'F', name: '산업수학', desc: '산업수학 과목입니다.' },
    { id: 99, grade: 3, semester: 2, group: 'F', name: '확률과 통계', desc: '확률과 통계 과목입니다.' },
    { id: 100, grade: 3, semester: 2, group: 'F', name: '영어 발표와 토론', desc: '영어 발표와 토론 과목입니다.' },
    { id: 101, grade: 3, semester: 2, group: 'F', name: '영미 문학 읽기', desc: '영미 문학 읽기 과목입니다.' },
    { id: 102, grade: 3, semester: 2, group: 'F', name: '심화 영어 독해와 작문', desc: '심화 영어 독해와 작문 과목입니다.' },
    { id: 103, grade: 3, semester: 2, group: 'F', name: '영어Ⅱ', desc: '영어Ⅱ 과목입니다.' },
    { id: 104, grade: 3, semester: 2, group: 'F', name: '윤리문제 탐구', desc: '윤리문제 탐구 과목입니다.' },
    { id: 105, grade: 3, semester: 2, group: 'F', name: '동아시아 역사 기행', desc: '동아시아 역사 기행 과목입니다.' },
    { id: 106, grade: 3, semester: 2, group: 'F', name: '역사로 탐구하는 현대 세계', desc: '역사로 탐구하는 현대 세계 과목입니다.' },
    { id: 107, grade: 3, semester: 2, group: 'F', name: '금융과 경제생활', desc: '금융과 경제생활 과목입니다.' },
    { id: 108, grade: 3, semester: 2, group: 'F', name: '여행지리', desc: '여행지리 과목입니다.' },
    { id: 109, grade: 3, semester: 2, group: 'F', name: '후마니타스', desc: '후마니타스 과목입니다.' },
    { id: 110, grade: 3, semester: 2, group: 'F', name: '전자기와 양자', desc: '전자기와 양자 과목입니다.' },
    { id: 111, grade: 3, semester: 2, group: 'F', name: '화학 반응의 세계', desc: '화학 반응의 세계 과목입니다.' },
    { id: 112, grade: 3, semester: 2, group: 'F', name: '생물의 유전', desc: '생물의 유전 과목입니다.' },
    { id: 113, grade: 3, semester: 2, group: 'F', name: '행성우주과학', desc: '행성우주과학 과목입니다.' },
    { id: 114, grade: 3, semester: 2, group: 'F', name: '융합과학 탐구', desc: '융합과학 탐구 과목입니다.' },
    { id: 115, grade: 3, semester: 2, group: 'F', name: '프런티어 사이언스', desc: '프런티어 사이언스 과목입니다.' },
    { id: 116, grade: 3, semester: 2, group: 'F', name: '창의공학설계', desc: '창의공학설계 과목입니다.' },
    { id: 117, grade: 3, semester: 2, group: 'F', name: '정보과학', desc: '정보과학 과목입니다.' },
    { id: 118, grade: 3, semester: 2, group: 'F', name: '언어생활과 한자', desc: '언어생활과 한자 과목입니다.' },
    { id: 119, grade: 3, semester: 2, group: 'F', name: '심화 중국어', desc: '심화 중국어 과목입니다.' },
    { id: 120, grade: 3, semester: 2, group: 'F', name: '심화 일본어', desc: '심화 일본어 과목입니다.' },
    
    { id: 121, grade: 3, semester: 1, group: 'G', name: '음악 감상과 비평', desc: '음악 감상과 비평 과목입니다.' },
    { id: 122, grade: 3, semester: 1, group: 'G', name: '미술 감상과 비평', desc: '미술 감상과 비평 과목입니다.' },
    
    { id: 123, grade: 3, semester: 2, group: 'H', name: '음악 연주와 창작', desc: '음악 연주와 창작 과목입니다.' },
    { id: 124, grade: 3, semester: 2, group: 'H', name: '미술 창작', desc: '미술 창작 과목입니다.' },
    
    { id: 125, grade: 3, semester: 1, group: 'I', name: '지속가능한 삶과 공동체 생활탐구', desc: '지속가능한 삶과 공동체 생활탐구 과목입니다.' },
    { id: 126, grade: 3, semester: 2, group: 'I', name: '지속가능한 삶과 공동체 생활탐구', desc: '지속가능한 삶과 공동체 생활탐구 과목입니다.' },
    { id: 127, grade: 3, semester: 1, group: 'I', name: '보건 진로 탐색', desc: '보건 진로 탐색 과목입니다.' },
    { id: 128, grade: 3, semester: 2, group: 'I', name: '보건 진로 탐색', desc: '보건 진로 탐색 과목입니다.' },
    { id: 129, grade: 3, semester: 1, group: 'I', name: '자기 주도적인 삶과 미래 역량 탐구', desc: '자기 주도적인 삶과 미래 역량 탐구 과목입니다.' },
    { id: 130, grade: 3, semester: 2, group: 'I', name: '자기 주도적인 삶과 미래 역량 탐구', desc: '자기 주도적인 삶과 미래 역량 탐구 과목입니다.' }
];

const courses = rawCourses.map(course => {
    return { ...course, pdfPage: pageMapping[course.name] || 1 };
});

// ▼▼▼ 4. 앱 전역 상태 변수 ▼▼▼
let currentUser = localStorage.getItem('currentUser') || null;
let currentGrade = parseInt(localStorage.getItem('currentGrade')) || 2;
let myEnrolledCourses = [];
let qaData = [];

function init() { 
    if (currentUser) { showApp(); } else { showLogin(); } 
}

function login() {
    const username = document.getElementById('username-input').value.trim();
    const grade = document.getElementById('grade-input').value;
    
    if (username === '') { alert('이름 또는 학번을 입력해주세요.'); return; }
    
    currentUser = username;
    currentGrade = parseInt(grade);
    localStorage.setItem('currentUser', currentUser);
    localStorage.setItem('currentGrade', currentGrade);
    
    showApp();
}

function logout() { 
    currentUser = null; 
    localStorage.removeItem('currentUser'); 
    localStorage.removeItem('currentGrade');
    showLogin(); 
}

function showLogin() { 
    document.getElementById('login-container').style.display = 'block'; 
    document.getElementById('app-container').style.display = 'none'; 
    document.getElementById('mobile-cart-btn').style.display = 'none'; 
}

function showApp() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('app-container').style.display = 'block';
    
    if(window.innerWidth <= 768) {
        document.getElementById('mobile-cart-btn').style.display = 'flex';
    }

    document.getElementById('user-greeting').innerText = currentUser === 'admin' ? '관리자 모드' : `${currentGrade}학년 ${currentUser}님`;
    
    loadMyCoursesFromDB();
    listenToQABoard();
}

function toggleMobileCart() {
    const cartSection = document.getElementById('cart-section');
    const overlay = document.getElementById('cart-overlay');
    if (cartSection && overlay) {
        cartSection.classList.toggle('open');
        overlay.classList.toggle('open');
    }
}

// ▼▼▼ 5. 수강내역 DB 연동 로직 ▼▼▼
function loadMyCoursesFromDB() {
    if (currentUser === 'admin') {
        myEnrolledCourses = [];
        render();
        return;
    }

    db.collection("users").doc(currentUser).get().then((doc) => {
        if (doc.exists) {
            myEnrolledCourses = doc.data().courses || [];
            
            // 유효하지 않은 과목 청소
            myEnrolledCourses = myEnrolledCourses.filter(enrolled => 
                courses.some(valid => valid.name === enrolled.name && valid.group === enrolled.group)
            );
            // 타 학년/과거 지정과목 청소
            myEnrolledCourses = myEnrolledCourses.filter(c => c.grade === currentGrade && c.group !== '지정');
        } else {
            myEnrolledCourses = [];
        }

        // 현재 학년에 맞는 지정 과목 세팅
        const mandatoryCourses = courses.filter(c => c.grade === currentGrade && c.group === '지정');
        mandatoryCourses.forEach(mandatory => {
            if (!myEnrolledCourses.some(e => e.id === mandatory.id)) {
                myEnrolledCourses.push(mandatory);
            }
        });

        saveMyCoursesToDB();
        render();
    }).catch((error) => {
        console.error("수강 내역 불러오기 실패:", error);
        // 에러 시 빈 목록으로라도 화면을 안전하게 띄우도록 처리
        myEnrolledCourses = [];
        render();
    });
}

function saveMyCoursesToDB() {
    if (currentUser === 'admin') return;
    db.collection("users").doc(currentUser).set({
        grade: currentGrade,
        courses: myEnrolledCourses
    }).catch((error) => {
        console.error("수강 내역 저장 실패:", error);
    });
}

function getEnrolledCount(semester, group) {
    return myEnrolledCourses.filter(c => c.semester === semester && c.group === group).length;
}

// ▼▼▼ 6. 화면 렌더링 (과목 목록 & 수강 내역) - 버그 방어막 탑재 ▼▼▼
function render() {
    try {
        const badge = document.getElementById('cart-count-badge');
        if (badge) { badge.innerText = myEnrolledCourses.length; }

        // 제출 상태 버튼 초기화
        const isSubmitted = localStorage.getItem('isSubmitted_' + currentUser) === 'true';
        const submitBtn = document.querySelector('.btn-submit');
        if (submitBtn) {
            if (isSubmitted) {
                submitBtn.innerText = '제출이 완료되었습니다';
                submitBtn.disabled = true;
                submitBtn.style.backgroundColor = '#6c757d';
                submitBtn.style.cursor = 'not-allowed';
            } else {
                submitBtn.innerText = '모의 수강신청 제출';
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '#0056b3';
                submitBtn.style.cursor = 'pointer';
            }
        }

        const courseListDiv = document.getElementById('course-list');
        const myCoursesDiv = document.getElementById('my-courses');
        const keyword = document.getElementById('search-input').value.toLowerCase();

        // 화면 초기화
        if(courseListDiv) courseListDiv.innerHTML = '';
        if(myCoursesDiv) myCoursesDiv.innerHTML = '';

        const filteredCourses = courses.filter(c => 
            c.grade === currentGrade && 
            (c.name.toLowerCase().includes(keyword) || c.desc.toLowerCase().includes(keyword))
        );

        if (filteredCourses.length === 0) {
            if(courseListDiv) courseListDiv.innerHTML = '<p style="color:#666;">해당 학년이나 검색어에 맞는 과목이 없습니다.</p>';
        } else {
            const semesters = [1, 2];
            
            semesters.forEach(semester => {
                const coursesInSem = filteredCourses.filter(c => c.semester === semester);
                if (coursesInSem.length > 0) {
                    const semWrapper = document.createElement('div');
                    semWrapper.className = 'grade-wrapper';
                    semWrapper.innerHTML = `<div class="grade-header">${currentGrade}학년 ${semester}학기 과목</div>`;
                    if(courseListDiv) courseListDiv.appendChild(semWrapper);

                    // '지정' 그룹을 무조건 맨 앞으로 강제 정렬
                    let groups = ['지정', ...[...new Set(coursesInSem.map(c => c.group))].filter(g => g !== '지정')];
                    
                    groups.forEach(group => {
                        const coursesInGroup = coursesInSem.filter(c => c.group === group);
                        if (coursesInGroup.length > 0) {
                            const groupBox = document.createElement('div');
                            groupBox.className = 'group-box';
                            
                            const currentCount = getEnrolledCount(semester, group);
                            let maxCount = 0;
                            if(group !== '지정' && rules[currentGrade] && rules[currentGrade][semester] && rules[currentGrade][semester][group]) {
                                maxCount = rules[currentGrade][semester][group];
                            }

                            const isComplete = currentCount === maxCount;
                            const progressText = group === '지정' ? '(필수)' : `(<span class="progress-text ${isComplete ? 'complete' : ''}">${currentCount} / ${maxCount}</span>)`;

                            const groupTitle = document.createElement('div');
                            groupTitle.className = 'group-title';
                            groupTitle.innerHTML = `<span>${group === '지정' ? '지정 과목' : `선택 ${group} 군`}</span> <span>${progressText}</span>`;
                            groupBox.appendChild(groupTitle);

                            const groupCards = document.createElement('div');
                            groupCards.className = 'group-cards';

                            coursesInGroup.forEach(course => {
                                const isEnrolled = myEnrolledCourses.some(e => e.id === course.id);
                                
                                let btnHtml = '';
                                if (group === '지정' || currentUser === 'admin') {
                                    btnHtml = `<button class="btn-disabled" disabled>신청불가</button>`;
                                } else if (isSubmitted) {
                                    btnHtml = `<button class="btn-disabled" disabled>제출완료</button>`;
                                } else if (isEnrolled) {
                                    btnHtml = `<button class="btn-cancel" onclick="cancelCourse(${course.id})">취소</button>`;
                                } else if (currentCount >= maxCount) {
                                    btnHtml = `<button class="btn-disabled" disabled>신청마감</button>`;
                                } else {
                                    btnHtml = `<button class="btn-enroll" onclick="enrollCourse(${course.id})">신청</button>`;
                                }

                                const card = document.createElement('div');
                                card.className = 'card';
                                card.innerHTML = `
                                    <div><h4 style="color: #0056b3;">${course.name}</h4></div>
                                    <div class="button-group">
                                        <button class="btn-detail" onclick="showDetail(${course.id})">상세</button>
                                        ${btnHtml}
                                    </div>
                                `;
                                groupCards.appendChild(card);
                            });
                            groupBox.appendChild(groupCards);
                            if(courseListDiv) courseListDiv.appendChild(groupBox);
                        }
                    });
                }
            });
        }

        if (myEnrolledCourses.length === 0) {
            if(myCoursesDiv) myCoursesDiv.innerHTML = '<p>내역 없음</p>';
        } else {
            [1, 2].forEach(semester => {
                const semCourses = myEnrolledCourses.filter(c => c.semester === semester);
                if (semCourses.length > 0) {
                    const semHeader = document.createElement('div');
                    semHeader.className = 'semester-header';
                    semHeader.innerText = `${semester}학기 수강 목록`;
                    if(myCoursesDiv) myCoursesDiv.appendChild(semHeader);

                    semCourses.forEach(course => {
                        const isMandatory = course.group === '지정';
                        const card = document.createElement('div');
                        card.className = 'card';
                        card.style.marginBottom = '10px';
                        
                        const cancelBtnHtml = (isMandatory || currentUser === 'admin' || isSubmitted) ? '' : `<button class="btn-cancel" onclick="cancelCourse(${course.id})" style="padding:4px; margin-top:5px; width:100%;">수강 취소</button>`;
                        
                        card.innerHTML = `
                            <div style="font-size:14px; font-weight:bold;">${course.name}</div>
                            <div style="font-size:12px; color:#666;">${course.group === '지정' ? '필수지정' : `선택 ${course.group}`}</div>
                            ${cancelBtnHtml}
                        `;
                        if(myCoursesDiv) myCoursesDiv.appendChild(card);
                    });
                }
            });
        }
    } catch(err) {
        console.error("화면 그리기 중 오류 발생:", err);
    }
}

function enrollCourse(id) {
    if (currentUser === 'admin') return;

    if (localStorage.getItem('isSubmitted_' + currentUser) === 'true') {
        alert('이미 최종 제출이 완료되어 변경할 수 없습니다.');
        return;
    }

    const course = courses.find(c => c.id === id);
    if (!course) return;

    // 타 학기 동일 과목 중복 수강 방지
    const isAlreadyTaken = myEnrolledCourses.some(e => e.name === course.name && e.id !== course.id);
    if (isAlreadyTaken) {
        alert(`'${course.name}' 과목은 다른 학기에서 이미 신청하셨습니다. 중복 수강은 불가능합니다.`);
        return;
    }

    if (course.group !== '지정') {
        const maxCount = rules[currentGrade][course.semester][course.group];
        const currentCount = getEnrolledCount(course.semester, course.group);
        if (currentCount >= maxCount) {
            alert(`선택 ${course.group} 군은 최대 ${maxCount}개까지만 선택할 수 있습니다.`);
            return;
        }
    }

    if (!myEnrolledCourses.some(e => e.id === id)) {
        myEnrolledCourses.push(course);
        saveMyCoursesToDB();
        render();
    }
}

function cancelCourse(id) { 
    if (currentUser === 'admin') return;

    if (localStorage.getItem('isSubmitted_' + currentUser) === 'true') {
        alert('이미 최종 제출이 완료되어 변경할 수 없습니다.');
        return;
    }

    const course = myEnrolledCourses.find(e => e.id === id);
    if (course && course.group === '지정') {
        alert('지정 과목은 취소할 수 없습니다.');
        return;
    }
    myEnrolledCourses = myEnrolledCourses.filter(e => e.id !== id); 
    saveMyCoursesToDB(); 
    render(); 
}

function submitCourses() {
    if (currentUser === 'admin') return;

    const userRules = rules[currentGrade];
    let isComplete = true;
    let missingMessages = [];

    for (let sem in userRules) {
        for (let group in userRules[sem]) {
            const required = userRules[sem][group];
            const current = getEnrolledCount(parseInt(sem), group);
            if (current !== required) {
                isComplete = false;
                missingMessages.push(`${sem}학기 선택 ${group} 군 (${current}/${required}개)`);
            }
        }
    }

    if (isComplete) {
        alert('축하합니다! 모든 조건을 완벽하게 충족하여 모의 수강신청 제출이 완료되었습니다.');
        localStorage.setItem('isSubmitted_' + currentUser, 'true');
        render();
    } else {
        alert('아직 조건이 부족합니다!\n\n[부족한 항목]\n' + missingMessages.join('\n'));
    }
}

// ▼▼▼ 7. 파이어베이스 질문 게시판 로직 ▼▼▼
function listenToQABoard() {
    db.collection("qa").orderBy("timestamp", "desc").onSnapshot((querySnapshot) => {
        qaData = [];
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            data.id = doc.id;
            qaData.push(data);
        });
        renderQA();
    });
}

function renderQA() {
    const qaListDiv = document.getElementById('qa-list');
    const qaFormDiv = document.getElementById('qa-form');

    if (currentUser === 'admin') {
        qaFormDiv.innerHTML = '<p style="color:#0056b3; font-weight:bold; margin:0;">관리자 계정입니다. 학생들의 질문을 확인하고 답변을 등록해 주세요.</p>';
    } else {
        qaFormDiv.innerHTML = `
            <input type="text" id="qa-title-input" placeholder="질문 제목" style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
            <textarea id="qa-content-input" rows="3" placeholder="궁금한 내용을 입력하세요" style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;"></textarea>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <label style="font-size: 14px; cursor: pointer;"><input type="checkbox" id="qa-private-checkbox"> 선생님만 볼 수 있게 비공개 설정</label>
                <button onclick="submitQuestion()" style="background-color: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">질문 등록</button>
            </div>
        `;
    }

    if(qaListDiv) qaListDiv.innerHTML = '';
    if (qaData.length === 0) {
        if(qaListDiv) qaListDiv.innerHTML = '<p style="color: #666;">등록된 질문이 없습니다.</p>';
        return;
    }

    qaData.forEach(qa => {
        const isMyPost = qa.author === currentUser;
        const isAdmin = currentUser === 'admin';
        const canView = !qa.isPrivate || isMyPost || isAdmin;
        
        const qaItem = document.createElement('div');
        qaItem.className = 'qa-item';
        
        if (canView) {
            let badgeHtml = qa.isPrivate ? '<span class="private-badge">비공개</span>' : '';
            let answerHtml = '';
            
            if (qa.answer) {
                answerHtml = `<div class="qa-answer"><strong style="color: #0056b3;">선생님 답변:</strong><br><div style="margin-top: 5px;">${qa.answer}</div></div>`;
            } else if (isAdmin) {
                answerHtml = `
                    <div style="margin-top: 15px; background: #f1f3f5; padding: 15px; border-radius: 5px;">
                        <textarea id="answer-input-${qa.id}" rows="2" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; margin-bottom: 10px;" placeholder="답변을 입력하세요"></textarea>
                        <button onclick="submitAnswer('${qa.id}')" style="background-color: #0056b3; color: white; padding: 8px 15px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">답변 등록</button>
                    </div>
                `;
            } else {
                answerHtml = `<div style="font-size: 13px; color: #888; margin-top: 15px; font-weight: bold;">답변 대기 중입니다.</div>`;
            }

            const displayAuthor = isAdmin ? qa.author : (isMyPost ? qa.author : '익명');

            qaItem.innerHTML = `
                <div class="qa-title">${qa.title} ${badgeHtml}</div>
                <div class="qa-meta">작성자: ${displayAuthor} | 작성일: ${qa.date}</div>
                <div class="qa-content">${qa.content}</div>
                ${answerHtml}
            `;
        } else {
            qaItem.innerHTML = `
                <div class="qa-title" style="color: #6c757d;">🔒 비공개 질문입니다.</div>
                <div class="qa-meta">작성일: ${qa.date}</div>
            `;
        }
        if(qaListDiv) qaListDiv.appendChild(qaItem);
    });
}

function submitQuestion() {
    const title = document.getElementById('qa-title-input').value.trim();
    const content = document.getElementById('qa-content-input').value.trim();
    const isPrivate = document.getElementById('qa-private-checkbox').checked;

    if (title === '' || content === '') {
        alert('제목과 내용을 모두 입력해주세요.');
        return;
    }

    db.collection("qa").add({
        author: currentUser,
        title: title,
        content: content,
        isPrivate: isPrivate,
        date: new Date().toLocaleDateString(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        answer: null
    }).then(() => {
        document.getElementById('qa-title-input').value = '';
        document.getElementById('qa-content-input').value = '';
        document.getElementById('qa-private-checkbox').checked = false;
    }).catch((error) => {
        console.error("질문 등록 실패:", error);
    });
}

function submitAnswer(id) {
    const answerInput = document.getElementById(`answer-input-${id}`);
    const answerContent = answerInput.value.trim();

    if (answerContent === '') {
        alert('답변 내용을 입력해주세요.');
        return;
    }

    db.collection("qa").doc(id).update({
        answer: answerContent
    }).catch((error) => {
        console.error("답변 등록 실패:", error);
    });
}

// ▼▼▼ 8. PDF 상세 보기 제어 로직 ▼▼▼
function showDetail(id) {
    try {
        const course = courses.find(c => c.id === id);
        
        document.getElementById('modal-title').innerText = course.name;
        document.getElementById('modal-category').innerText = `${course.grade}학년 / ${course.semester}학기 / ${course.group === '지정' ? '지정' : `선택 ${course.group}`}`;
        
        document.getElementById('modal').style.display = 'block';

        const canvas = document.getElementById('pdf-canvas');
        if (canvas && window.renderPage) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            window.renderPage(course.pdfPage);
        }
    } catch (e) {
        console.error("상세보기 오류:", e);
    }
}

function closeModal() { 
    document.getElementById('modal').style.display = 'none'; 
}

// 라이브러리 객체 안전 초기화
try {
    const pdfjsLib = window['pdfjs-dist/build/pdf'] || window.pdfjsLib;
    
    if (pdfjsLib) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

        let pdfDoc = null;
        pdfjsLib.getDocument('guide.pdf').promise.then(function(pdfDoc_) {
            pdfDoc = pdfDoc_;
        }).catch(function(error) {
            console.error('PDF 로드 실패:', error);
        });

        window.renderPage = function(pageNum) {
            if (!pdfDoc) {
                setTimeout(() => { if(window.renderPage) window.renderPage(pageNum); }, 200);
                return;
            }
            pdfDoc.getPage(pageNum).then(function(page) {
                const canvas = document.getElementById('pdf-canvas');
                if (!canvas) return;
                const ctx = canvas.getContext('2d');
                const viewport = page.getViewport({scale: 1.5});
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                page.render({ canvasContext: ctx, viewport: viewport });
            }).catch(e => console.error("페이지 렌더링 실패:", e));
        };
    } else {
        console.error("pdfjsLib 객체를 찾을 수 없습니다. HTML의 script 태그를 확인해주세요.");
    }
} catch (e) {
    console.error("PDF 초기화 중 에러 발생:", e);
}

window.onclick = function(event) { if (event.target == document.getElementById('modal')) closeModal(); }
document.getElementById('search-input').addEventListener('input', render);
init();