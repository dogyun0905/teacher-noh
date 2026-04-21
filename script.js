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

const pageMapping = { '문학': 42, '대수': 55, '영어1': 72, '스포츠 생활 1': 138, '독서와 작문': 41, '미적분 1': 56, 
    '영어 독해와 작문': 74, '스포츠 생활 2': 139, '스포츠 문화': 136, '스포츠 과학': 137, '문학과 영상': 44, '독서 토론과 글쓰기': 46, 
    '주제 탐구 독서': 43, '언어생활 탐구': 48, '화법과 언어': 47, '언어생활과 한자': 201, '기하': 57, '경제 수학': 60, '인공지능 수학': 61, '미적분Ⅱ': 58, 
    '수학과제 탐구': 65, '산업수학': 64, '확률과 통계': 57, '심화 영어': 77, '미디어 영어': 81, '세계 문화와 영어': 82, '실생활 영어 회화': 80, '영어 발표와 토론': 76, 
    '영미 문학 읽기': 78, '심화 영어 독해와 작문': 79, '영어Ⅱ': 73, '인문학과 윤리': 101, '세계시민과 지리': 89, '경제': 86, '정치': 98, '사회문제 탐구': 104, '세계사': 90,
     '윤리와 사상': 100, '도시의 미래 탐구': 94, '사회와 문화': 91, '현대사회와 윤리': 92, '한국지리 탐구': 93, '기후변화와 지속가능한 세계': 106, '동아시아 역사 기행': 95, 
     '역사로 탐구하는 현대 세계': 103, '법과 사회': 97, '윤리문제 탐구': 107, '금융과 경제생활': 105, '여행지리': 102, '물리학': 117, '화학': 118, '생명과학': 119, '지구과학': 120, 
     '역학과 에너지': 121, '물질과 에너지': 123, '세포와 물질대사': 125, '지구시스템과학': 127, '기후변화와 환경생태': 130, '전자기와 양자': 122, '화학 반응의 세계': 124, 
     '생물의 유전': 126, '행성우주과학': 128, '융합과학 탐구': 131, '프런티어 사이언스': 124, '정보': 159, '데이터 과학': 161, '창의공학설계': 154, '소프트웨어와 생활': 162, 
     '정보과학': 154, '한문 고전 읽기': 192, '일본어': 171, '중국어': 170, '일본어 회화': 188, '중국어 회화': 187, '중국 문화': 196, '일본 문화': 197, '심화 중국어': 179, 
     '심화 일본어': 180, '음악 감상과 비평': 145, '미술 감상과 비평': 147, '음악 연주와 창작': 144, '미술 창작': 146, '후마니타스': 202, '지속가능한 삶과 공동체 생활탐구': 203, 
     '보건 진로 탐색': 204, '자기 주도적인 삶과 미래 역량 탐구': 205 };
     
const rules = { 2: { 1: { 'A': 4, 'C': 1 }, 2: { 'B': 4, 'D': 1 } }, 3: { 1: { 'E': 8, 'G': 1, 'I': 1 }, 2: { 'F': 8, 'H': 1, 'I': 1 } } };
const rawCourses = [ { id: 1001, grade: 2, semester: 1, group: '지정', name: '문학', desc: '필수 지정 과목입니다.' }, { id: 1002, grade: 2, semester: 1, group: '지정', name: '대수', desc: '필수 지정 과목입니다.' }, { id: 1003, grade: 2, semester: 1, group: '지정', name: '영어1', desc: '필수 지정 과목입니다.' }, { id: 1004, grade: 2, semester: 1, group: '지정', name: '스포츠 생활 1', desc: '필수 지정 과목입니다.' }, { id: 1005, grade: 2, semester: 2, group: '지정', name: '독서와 작문', desc: '필수 지정 과목입니다.' }, { id: 1006, grade: 2, semester: 2, group: '지정', name: '미적분 1', desc: '필수 지정 과목입니다.' }, { id: 1007, grade: 2, semester: 2, group: '지정', name: '영어 독해와 작문', desc: '필수 지정 과목입니다.' }, { id: 1008, grade: 2, semester: 2, group: '지정', name: '스포츠 생활 2', desc: '필수 지정 과목입니다.' }, { id: 1009, grade: 3, semester: 1, group: '지정', name: '스포츠 문화', desc: '필수 지정 과목입니다.' }, { id: 1010, grade: 3, semester: 2, group: '지정', name: '스포츠 과학', desc: '필수 지정 과목입니다.' }, { id: 9, grade: 2, semester: 1, group: 'A', name: '문학과 영상', desc: '문학과 영상 과목입니다.' }, { id: 10, grade: 2, semester: 1, group: 'A', name: '독서 토론과 글쓰기', desc: '독서 토론과 글쓰기 과목입니다.' }, { id: 11, grade: 2, semester: 1, group: 'A', name: '기하', desc: '기하 과목입니다.' }, { id: 12, grade: 2, semester: 1, group: 'A', name: '경제 수학', desc: '경제 수학 과목입니다.' }, { id: 13, grade: 2, semester: 1, group: 'A', name: '심화 영어', desc: '심화 영어 과목입니다.' }, { id: 14, grade: 2, semester: 1, group: 'A', name: '미디어 영어', desc: '미디어 영어 과목입니다.' }, { id: 15, grade: 2, semester: 1, group: 'A', name: '세계 문화와 영어', desc: '세계 문화와 영어 과목입니다.' }, { id: 16, grade: 2, semester: 1, group: 'A', name: '실생활 영어 회화', desc: '실생활 영어 회화 과목입니다.' }, { id: 17, grade: 2, semester: 1, group: 'A', name: '인문학과 윤리', desc: '인문학과 윤리 과목입니다.' }, { id: 18, grade: 2, semester: 1, group: 'A', name: '세계시민과 지리', desc: '세계시민과 지리 과목입니다.' }, { id: 19, grade: 2, semester: 1, group: 'A', name: '경제', desc: '경제 과목입니다.' }, { id: 20, grade: 2, semester: 1, group: 'A', name: '정치', desc: '정치 과목입니다.' }, { id: 21, grade: 2, semester: 1, group: 'A', name: '사회문제 탐구', desc: '사회문제 탐구 과목입니다.' }, { id: 22, grade: 2, semester: 1, group: 'A', name: '세계사', desc: '세계사 과목입니다.' }, { id: 23, grade: 2, semester: 1, group: 'A', name: '물리학', desc: '물리학 과목입니다.' }, { id: 24, grade: 2, semester: 1, group: 'A', name: '화학', desc: '화학 과목입니다.' }, { id: 25, grade: 2, semester: 1, group: 'A', name: '생명과학', desc: '생명과학 과목입니다.' }, { id: 26, grade: 2, semester: 1, group: 'A', name: '지구과학', desc: '지구과학 과목입니다.' }, { id: 27, grade: 2, semester: 1, group: 'A', name: '기후변화와 환경생태', desc: '기후변화와 환경생태 과목입니다.' }, { id: 28, grade: 2, semester: 1, group: 'A', name: '정보', desc: '정보 과목입니다.' }, { id: 29, grade: 2, semester: 1, group: 'A', name: '언어생활과 한자', desc: '언어생활과 한자 과목입니다.' }, { id: 30, grade: 2, semester: 2, group: 'B', name: '문학과 영상', desc: '문학과 영상 과목입니다.' }, { id: 31, grade: 2, semester: 2, group: 'B', name: '독서 토론과 글쓰기', desc: '독서 토론과 글쓰기 과목입니다.' }, { id: 32, grade: 2, semester: 2, group: 'B', name: '기하', desc: '기하 과목입니다.' }, { id: 33, grade: 2, semester: 2, group: 'B', name: '경제 수학', desc: '경제 수학 과목입니다.' }, { id: 34, grade: 2, semester: 2, group: 'B', name: '인공지능 수학', desc: '인공지능 수학 과목입니다.' }, { id: 35, grade: 2, semester: 2, group: 'B', name: '심화 영어', desc: '심화 영어 과목입니다.' }, { id: 36, grade: 2, semester: 2, group: 'B', name: '미디어 영어', desc: '미디어 영어 과목입니다.' }, { id: 37, grade: 2, semester: 2, group: 'B', name: '세계 문화와 영어', desc: '세계 문화와 영어 과목입니다.' }, { id: 38, grade: 2, semester: 2, group: 'B', name: '실생활 영어 회화', desc: '실생활 영어 회화 과목입니다.' }, { id: 39, grade: 2, semester: 2, group: 'B', name: '윤리와 사상', desc: '윤리와 사상 과목입니다.' }, { id: 40, grade: 2, semester: 2, group: 'B', name: '도시의 미래 탐구', desc: '도시의 미래 탐구 과목입니다.' }, { id: 41, grade: 2, semester: 2, group: 'B', name: '경제', desc: '경제 과목입니다.' }, { id: 42, grade: 2, semester: 2, group: 'B', name: '사회와 문화', desc: '사회와 문화 과목입니다.' }, { id: 43, grade: 2, semester: 2, group: 'B', name: '사회문제 탐구', desc: '사회문제 탐구 과목입니다.' }, { id: 44, grade: 2, semester: 2, group: 'B', name: '세계사', desc: '세계사 과목입니다.' }, { id: 45, grade: 2, semester: 2, group: 'B', name: '물리학', desc: '물리학 과목입니다.' }, { id: 46, grade: 2, semester: 2, group: 'B', name: '화학', desc: '화학 과목입니다.' }, { id: 47, grade: 2, semester: 2, group: 'B', name: '생명과학', desc: '생명과학 과목입니다.' }, { id: 48, grade: 2, semester: 2, group: 'B', name: '지구과학', desc: '지구과학 과목입니다.' }, { id: 49, grade: 2, semester: 2, group: 'B', name: '역학과 에너지', desc: '역학과 에너지 과목입니다.' }, { id: 50, grade: 2, semester: 2, group: 'B', name: '물질과 에너지', desc: '물질과 에너지 과목입니다.' }, { id: 51, grade: 2, semester: 2, group: 'B', name: '세포와 물질대사', desc: '세포와 물질대사 과목입니다.' }, { id: 52, grade: 2, semester: 2, group: 'B', name: '지구시스템과학', desc: '지구시스템과학 과목입니다.' }, { id: 53, grade: 2, semester: 2, group: 'B', name: '기후변화와 환경생태', desc: '기후변화와 환경생태 과목입니다.' }, { id: 54, grade: 2, semester: 2, group: 'B', name: '데이터 과학', desc: '데이터 과학 과목입니다.' }, { id: 55, grade: 2, semester: 2, group: 'B', name: '한문 고전 읽기', desc: '한문 고전 읽기 과목입니다.' }, { id: 56, grade: 2, semester: 1, group: 'C', name: '일본어', desc: '일본어 과목입니다.' }, { id: 57, grade: 2, semester: 1, group: 'C', name: '중국어', desc: '중국어 과목입니다.' }, { id: 58, grade: 2, semester: 2, group: 'D', name: '일본어 회화', desc: '일본어 회화 과목입니다.' }, { id: 59, grade: 2, semester: 2, group: 'D', name: '중국어 회화', desc: '중국어 회화 과목입니다.' }, { id: 60, grade: 3, semester: 1, group: 'E', name: '주제 탐구 독서', desc: '주제 탐구 독서 과목입니다.' }, { id: 61, grade: 3, semester: 1, group: 'E', name: '언어생활 탐구', desc: '언어생활 탐구 과목입니다.' }, { id: 62, grade: 3, semester: 1, group: 'E', name: '화법과 언어', desc: '화법과 언어 과목입니다.' }, { id: 63, grade: 3, semester: 1, group: 'E', name: '미적분Ⅱ', desc: '미적분Ⅱ 과목입니다.' }, { id: 64, grade: 3, semester: 1, group: 'E', name: '수학과제 탐구', desc: '수학과제 탐구 과목입니다.' }, { id: 65, grade: 3, semester: 1, group: 'E', name: '산업수학', desc: '산업수학 과목입니다.' }, { id: 66, grade: 3, semester: 1, group: 'E', name: '확률과 통계', desc: '확률과 통계 과목입니다.' }, { id: 67, grade: 3, semester: 1, group: 'E', name: '영어 발표와 토론', desc: '영어 발표와 토론 과목입니다.' }, { id: 68, grade: 3, semester: 1, group: 'E', name: '영미 문학 읽기', desc: '영미 문학 읽기 과목입니다.' }, { id: 69, grade: 3, semester: 1, group: 'E', name: '심화 영어 독해와 작문', desc: '심화 영어 독해와 작문 과목입니다.' }, { id: 70, grade: 3, semester: 1, group: 'E', name: '영어Ⅱ', desc: '영어Ⅱ 과목입니다.' }, { id: 71, grade: 3, semester: 1, group: 'E', name: '현대사회와 윤리', desc: '현대사회와 윤리 과목입니다.' }, { id: 72, grade: 3, semester: 1, group: 'E', name: '한국지리 탐구', desc: '한국지리 탐구 과목입니다.' }, { id: 73, grade: 3, semester: 1, group: 'E', name: '기후변화와 지속가능한 세계', desc: '기후변화와 지속가능한 세계 과목입니다.' }, { id: 74, grade: 3, semester: 1, group: 'E', name: '동아시아 역사 기행', desc: '동아시아 역사 기행 과목입니다.' }, { id: 75, grade: 3, semester: 1, group: 'E', name: '역사로 탐구하는 현대 세계', desc: '역사로 탐구하는 현대 세계 과목입니다.' }, { id: 76, grade: 3, semester: 1, group: 'E', name: '법과 사회', desc: '법과 사회 과목입니다.' }, { id: 77, grade: 3, semester: 1, group: 'E', name: '후마니타스', desc: '후마니타스 과목입니다.' }, { id: 78, grade: 3, semester: 1, group: 'E', name: '역학과 에너지', desc: '역학과 에너지 과목입니다.' }, { id: 79, grade: 3, semester: 1, group: 'E', name: '물질과 에너지', desc: '물질과 에너지 과목입니다.' }, { id: 80, grade: 3, semester: 1, group: 'E', name: '세포와 물질대사', desc: '세포와 물질대사 과목입니다.' }, { id: 81, grade: 3, semester: 1, group: 'E', name: '지구시스템과학', desc: '지구시스템과학 과목입니다.' }, { id: 82, grade: 3, semester: 1, group: 'E', name: '전자기와 양자', desc: '전자기와 양자 과목입니다.' }, { id: 83, grade: 3, semester: 1, group: 'E', name: '화학 반응의 세계', desc: '화학 반응의 세계 과목입니다.' }, { id: 84, grade: 3, semester: 1, group: 'E', name: '생물의 유전', desc: '생물의 유전 과목입니다.' }, { id: 85, grade: 3, semester: 1, group: 'E', name: '행성우주과학', desc: '행성우주과학 과목입니다.' }, { id: 86, grade: 3, semester: 1, group: 'E', name: '융합과학 탐구', desc: '융합과학 탐구 과목입니다.' }, { id: 87, grade: 3, semester: 1, group: 'E', name: '프런티어 사이언스', desc: '프런티어 사이언스 과목입니다.' }, { id: 88, grade: 3, semester: 1, group: 'E', name: '창의공학설계', desc: '창의공학설계 과목입니다.' }, { id: 89, grade: 3, semester: 1, group: 'E', name: '소프트웨어와 생활', desc: '소프트웨어와 생활 과목입니다.' }, { id: 90, grade: 3, semester: 1, group: 'E', name: '한문 고전 읽기', desc: '한문 고전 읽기 과목입니다.' }, { id: 91, grade: 3, semester: 1, group: 'E', name: '중국 문화', desc: '중국 문화 과목입니다.' }, { id: 92, grade: 3, semester: 1, group: 'E', name: '일본 문화', desc: '일본 문화 과목입니다.' }, { id: 93, grade: 3, semester: 2, group: 'F', name: '주제 탐구 독서', desc: '주제 탐구 독서 과목입니다.' }, { id: 94, grade: 3, semester: 2, group: 'F', name: '언어생활 탐구', desc: '언어생활 탐구 과목입니다.' }, { id: 95, grade: 3, semester: 2, group: 'F', name: '화법과 언어', desc: '화법과 언어 과목입니다.' }, { id: 96, grade: 3, semester: 2, group: 'F', name: '미적분Ⅱ', desc: '미적분Ⅱ 과목입니다.' }, { id: 97, grade: 3, semester: 2, group: 'F', name: '수학과제 탐구', desc: '수학과제 탐구 과목입니다.' }, { id: 98, grade: 3, semester: 2, group: 'F', name: '산업수학', desc: '산업수학 과목입니다.' }, { id: 99, grade: 3, semester: 2, group: 'F', name: '확률과 통계', desc: '확률과 통계 과목입니다.' }, { id: 100, grade: 3, semester: 2, group: 'F', name: '영어 발표와 토론', desc: '영어 발표와 토론 과목입니다.' }, { id: 101, grade: 3, semester: 2, group: 'F', name: '영미 문학 읽기', desc: '영미 문학 읽기 과목입니다.' }, { id: 102, grade: 3, semester: 2, group: 'F', name: '심화 영어 독해와 작문', desc: '심화 영어 독해와 작문 과목입니다.' }, { id: 103, grade: 3, semester: 2, group: 'F', name: '영어Ⅱ', desc: '영어Ⅱ 과목입니다.' }, { id: 104, grade: 3, semester: 2, group: 'F', name: '윤리문제 탐구', desc: '윤리문제 탐구 과목입니다.' }, { id: 105, grade: 3, semester: 2, group: 'F', name: '동아시아 역사 기행', desc: '동아시아 역사 기행 과목입니다.' }, { id: 106, grade: 3, semester: 2, group: 'F', name: '역사로 탐구하는 현대 세계', desc: '역사로 탐구하는 현대 세계 과목입니다.' }, { id: 107, grade: 3, semester: 2, group: 'F', name: '금융과 경제생활', desc: '금융과 경제생활 과목입니다.' }, { id: 108, grade: 3, semester: 2, group: 'F', name: '여행지리', desc: '여행지리 과목입니다.' }, { id: 109, grade: 3, semester: 2, group: 'F', name: '후마니타스', desc: '후마니타스 과목입니다.' }, { id: 110, grade: 3, semester: 2, group: 'F', name: '전자기와 양자', desc: '전자기와 양자 과목입니다.' }, { id: 111, grade: 3, semester: 2, group: 'F', name: '화학 반응의 세계', desc: '화학 반응의 세계 과목입니다.' }, { id: 112, grade: 3, semester: 2, group: 'F', name: '생물의 유전', desc: '생물의 유전 과목입니다.' }, { id: 113, grade: 3, semester: 2, group: 'F', name: '행성우주과학', desc: '행성우주과학 과목입니다.' }, { id: 114, grade: 3, semester: 2, group: 'F', name: '융합과학 탐구', desc: '융합과학 탐구 과목입니다.' }, { id: 115, grade: 3, semester: 2, group: 'F', name: '프런티어 사이언스', desc: '프런티어 사이언스 과목입니다.' }, { id: 116, grade: 3, semester: 2, group: 'F', name: '창의공학설계', desc: '창의공학설계 과목입니다.' }, { id: 117, grade: 3, semester: 2, group: 'F', name: '정보과학', desc: '정보과학 과목입니다.' }, { id: 118, grade: 3, semester: 2, group: 'F', name: '언어생활과 한자', desc: '언어생활과 한자 과목입니다.' }, { id: 119, grade: 3, semester: 2, group: 'F', name: '심화 중국어', desc: '심화 중국어 과목입니다.' }, { id: 120, grade: 3, semester: 2, group: 'F', name: '심화 일본어', desc: '심화 일본어 과목입니다.' }, { id: 121, grade: 3, semester: 1, group: 'G', name: '음악 감상과 비평', desc: '음악 감상과 비평 과목입니다.' }, { id: 122, grade: 3, semester: 1, group: 'G', name: '미술 감상과 비평', desc: '미술 감상과 비평 과목입니다.' }, { id: 123, grade: 3, semester: 2, group: 'H', name: '음악 연주와 창작', desc: '음악 연주와 창작 과목입니다.' }, { id: 124, grade: 3, semester: 2, group: 'H', name: '미술 창작', desc: '미술 창작 과목입니다.' }, { id: 125, grade: 3, semester: 1, group: 'I', name: '지속가능한 삶과 공동체 생활탐구', desc: '지속가능한 삶과 공동체 생활탐구 과목입니다.' }, { id: 126, grade: 3, semester: 2, group: 'I', name: '지속가능한 삶과 공동체 생활탐구', desc: '지속가능한 삶과 공동체 생활탐구 과목입니다.' }, { id: 127, grade: 3, semester: 1, group: 'I', name: '보건 진로 탐색', desc: '보건 진로 탐색 과목입니다.' }, { id: 128, grade: 3, semester: 2, group: 'I', name: '보건 진로 탐색', desc: '보건 진로 탐색 과목입니다.' }, { id: 129, grade: 3, semester: 1, group: 'I', name: '자기 주도적인 삶과 미래 역량 탐구', desc: '자기 주도적인 삶과 미래 역량 탐구 과목입니다.' }, { id: 130, grade: 3, semester: 2, group: 'I', name: '자기 주도적인 삶과 미래 역량 탐구', desc: '자기 주도적인 삶과 미래 역량 탐구 과목입니다.' } ];
const courses = rawCourses.map(course => ({ ...course, pdfPage: pageMapping[course.name] || 1 }));

let currentUser = localStorage.getItem('currentUser') || null;
let currentGrade = parseInt(localStorage.getItem('currentGrade')) || 2;
let myEnrolledCourses = [];
let qaData = [];
let unsubscribeQA = null;

function init() { if (currentUser) { showApp(); } else { showLogin(); } }
function login() { const u = document.getElementById('username-input').value.trim(); const g = document.getElementById('grade-input').value; if (!u) return alert('이름을 입력하세요.'); currentUser = u; currentGrade = parseInt(g); localStorage.setItem('currentUser', u); localStorage.setItem('currentGrade', g); showApp(); }
function logout() { currentUser = null; localStorage.clear(); myEnrolledCourses = []; if (unsubscribeQA) unsubscribeQA(); showLogin(); }
function showLogin() { document.getElementById('login-container').style.display = 'block'; document.getElementById('app-container').style.display = 'none'; }
function showApp() { document.getElementById('login-container').style.display = 'none'; document.getElementById('app-container').style.display = 'block'; document.getElementById('user-greeting').innerText = currentUser === 'admin' ? '관리자 모드' : `${currentGrade}학년 ${currentUser}님`; showCourseView(); loadMyCoursesFromDB(); listenToQABoard(); }
function showQAView() { document.getElementById('course-view').style.display = 'none'; document.getElementById('qa-view').style.display = 'flex'; document.getElementById('nav-qa-btn').style.display = 'none'; document.getElementById('nav-course-btn').style.display = 'block'; }
function showCourseView() { document.getElementById('course-view').style.display = 'flex'; document.getElementById('qa-view').style.display = 'none'; document.getElementById('nav-qa-btn').style.display = 'block'; document.getElementById('nav-course-btn').style.display = 'none'; }

function loadMyCoursesFromDB() {
    myEnrolledCourses = courses.filter(c => c.grade === currentGrade && c.group === '지정');
    if (currentUser === 'admin') return render();
    db.collection("users").doc(currentUser).get().then((doc) => {
        if (doc.exists) {
            const dbC = doc.data().courses || [];
            const valid = dbC.filter(e => e.group !== '지정' && e.grade === currentGrade && courses.some(v => v.id === e.id));
            myEnrolledCourses = [...myEnrolledCourses, ...valid];
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
    const filtered = courses.filter(c => c.grade === currentGrade && (c.name.toLowerCase().includes(key)));

    if (filtered.length === 0) clist.innerHTML = '<p>결과 없음</p>';
    else {
        [1, 2].forEach(sem => {
            const sCourses = filtered.filter(c => c.semester === sem);
            if (sCourses.length > 0) {
                const wrapper = document.createElement('div'); wrapper.className = 'grade-wrapper';
                wrapper.innerHTML = `<div class="grade-header">${currentGrade}학년 ${sem}학기</div>`;
                clist.appendChild(wrapper);
                let gs = ['지정', ...[...new Set(sCourses.map(c => c.group))].filter(g => g !== '지정')];
                gs.forEach(g => {
                    const gCourses = sCourses.filter(c => c.group === g);
                    if (gCourses.length > 0) {
                        const box = document.createElement('div'); box.className = 'group-box';
                        const cur = getEnrolledCount(sem, g); let max = 0;
                        if(g !== '지정' && rules[currentGrade][sem][g]) max = rules[currentGrade][sem][g];
                        const comp = cur === max; const prog = g === '지정' ? '(필수)' : `(<span class="progress-text ${comp?'complete':''}">${cur}/${max}</span>)`;
                        box.innerHTML = `<div class="group-title"><span>${g==='지정'?'지정':`선택 ${g}`}</span><span>${prog}</span></div>`;
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
            const semHeader = document.createElement('div');
            semHeader.className = 'semester-header';
            semHeader.innerText = `${sem}학기`;
            mylist.appendChild(semHeader);
            
            sc.forEach(c => {
                const itemCard = document.createElement('div');
                itemCard.className = 'card'; // 네모 상자 모양 복구
                itemCard.style.marginBottom = '10px';
                
                const isMandatory = c.group === '지정';
                const cancelBtn = (isMandatory || currentUser === 'admin') ? '' : `<button class="btn-cancel" onclick="cancelCourse(${c.id})" style="width:100%; margin-top:10px; padding:8px;">취소</button>`;
                
                itemCard.innerHTML = `
                    <div style="font-weight:bold; font-size:15px; color:#333;">${c.name}</div>
                    <div style="font-size:12px; color:#666; margin-top:3px;">${isMandatory ? '필수지정' : `선택 ${c.group}군`}</div>
                    ${cancelBtn}
                `;
                mylist.appendChild(itemCard);
            });
        }
    });
}

function enrollCourse(id) {
    if (currentUser === 'admin') return;
    const c = courses.find(v => v.id === id);
    if (myEnrolledCourses.some(e => e.name === c.name)) return alert('중복 수강 불가');
    const max = rules[currentGrade][c.semester][c.group];
    if (getEnrolledCount(c.semester, c.group) >= max) return alert('인원 초과');
    myEnrolledCourses.push(c); saveMyCoursesToDB(); render();
}
function cancelCourse(id) { const c = myEnrolledCourses.find(e => e.id === id); if (c.group === '지정') return alert('지정 과목 취소 불가'); myEnrolledCourses = myEnrolledCourses.filter(e => e.id !== id); saveMyCoursesToDB(); render(); }
function submitCourses() { alert('제출 완료 (연습용)'); }

function listenToQABoard() {
    if (unsubscribeQA) unsubscribeQA();
    unsubscribeQA = db.collection("qa").orderBy("timestamp", "desc").onSnapshot(s => {
        qaData = s.docs.map(d => ({ id: d.id, ...d.data() })); renderQA();
    });
}
function renderQA() {
    const list = document.getElementById('qa-list'); const form = document.getElementById('qa-form');
    if (currentUser === 'admin') form.innerHTML = '<p>관리자 답변 모드</p>';
    else form.innerHTML = `<input type="text" id="qa-t" placeholder="제목" style="width:100%;padding:10px;margin-bottom:10px;"><textarea id="qa-c" rows="4" style="width:100%;padding:10px;margin-bottom:10px;"></textarea><div style="display:flex;justify-content:space-between;align-items:center;"><label><input type="checkbox" id="qa-p" onchange="document.getElementById('qa-pw').style.display=this.checked?'block':'none'">비공개</label><input type="password" id="qa-pw" placeholder="비번" style="display:none;padding:5px;width:100px;"><button onclick="subQ()" style="background:#28a745;color:white;padding:10px 20px;border:none;border-radius:4px;">등록</button></div>`;
    list.innerHTML = '';
    qaData.forEach(q => {
        const item = document.createElement('div'); item.className = 'qa-item';
        const isA = currentUser === 'admin';
        let del = isA ? `<button onclick="delQ('${q.id}')" style="background:#dc3545;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;">삭제</button>` : '';
        if (q.isPrivate && !isA) {
            item.innerHTML = `<div class="qa-title"><span>🔒 비공개 질문</span>${del}</div><div id="lock-${q.id}"><input type="password" id="p-${q.id}" placeholder="비번"><button onclick="chkP('${q.id}','${q.password}')">확인</button></div><div id="open-${q.id}" style="display:none;"><div class="qa-content">${q.content}</div>${q.answer?`<div class="qa-answer">${q.answer}</div>`:'대기중'}</div>`;
        } else {
            item.innerHTML = `<div class="qa-title"><span>${q.title}</span>${del}</div><div class="qa-meta">${q.author} | ${q.date}</div><div class="qa-content">${q.content}</div>${q.answer?`<div class="qa-answer">${q.answer}</div>`:isA?`<textarea id="ans-${q.id}"></textarea><button onclick="subA('${q.id}')">답변</button>`:'대기중'}`;
        }
        list.appendChild(item);
    });
}
function subQ() {
    const t = document.getElementById('qa-t').value.trim(); const c = document.getElementById('qa-c').value.trim(); const p = document.getElementById('qa-p').checked; const pw = document.getElementById('qa-pw').value.trim();
    if (!t || !c || (p && !pw)) return alert('내용 확인');
    db.collection("qa").add({ author: currentUser, title: t, content: c, isPrivate: p, password: pw, date: new Date().toLocaleDateString(), timestamp: firebase.firestore.FieldValue.serverTimestamp(), answer: null });
}
function subA(id) { const a = document.getElementById(`ans-${id}`).value.trim(); if (a) db.collection("qa").doc(id).update({ answer: a }); }
function delQ(id) { if (confirm('삭제?')) db.collection("qa").doc(id).delete(); }
function chkP(id, pw) { if (document.getElementById(`p-${id}`).value === pw) { document.getElementById(`lock-${id}`).style.display = 'none'; document.getElementById(`open-${id}`).style.display = 'block'; } else alert('틀림'); }

function showDetail(id) {
    const c = courses.find(v => v.id === id);
    document.getElementById('modal-title').innerText = c.name;
    document.getElementById('modal-category').innerText = `${c.grade}학년 / ${c.semester}학기 / ${c.group}`;
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
        pdfjsLib.getDocument('guide.pdf').promise.then(d => { pdfDoc = d; });
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