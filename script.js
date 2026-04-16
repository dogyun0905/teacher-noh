// ▼▼▼ 선생님 전용 설정: 실제 PDF 페이지 번호 입력란 ▼▼▼
const pageMapping = {
    // --- 지정 과목 ---
    '문학': 42, 
    '대수': 55,
    '영어1': 72,
    '스포츠 생활 1': 138,
    '독서와 작문': 41,
    '미적분 1': 56,
    '영어 독해와 작문': 74,
    '스포츠 생활 2': 139,
    '스포츠 문화': 136,
    '스포츠 과학': 137,

    // --- 국어 교과 ---
    '문학과 영상': 44,
    '독서 토론과 글쓰기': 46,
    '주제 탐구 독서': 43,
    '언어생활 탐구': 48,
    '화법과 언어': 47,
    '언어생활과 한자': 201,

    // --- 수학 교과 ---
    '기하': 59,
    '경제 수학': 60,
    '인공지능 수학': 61,
    '미적분Ⅱ': 58,
    '수학과제 탐구': 65,
    '산업수학': 64,
    '확률과 통계': 57,

    // --- 영어 교과 ---
    '심화 영어': 77,
    '미디어 영어': 81,
    '세계 문화와 영어': 82,
    '실생활 영어 회화': 80,
    '영어 발표와 토론': 76,
    '영미 문학 읽기': 78,
    '심화 영어 독해와 작문': 79,
    '영어Ⅱ': 73,

    // --- 사회 교과 ---
    '인문학과 윤리': 101,
    '세계시민과 지리': 89,
    '경제': 98,
    '정치': 96,
    '사회문제 탐구': 104,
    '세계사': 90,
    '윤리와 사상': 100,
    '도시의 미래 탐구': 94,
    '사회와 문화': 91,
    '현대사회와 윤리': 92,
    '한국지리 탐구': 93,
    '기후변화와 지속가능한 세계': 106,
    '동아시아 역사 기행': 95,
    '역사로 탐구하는 현대 세계': 103,
    '법과 사회': 97,
    '윤리문제 탐구': 107,
    '금융과 경제생활': 105,
    '여행지리': 102,

    // --- 과학 교과 ---
    '물리학': 117,
    '화학': 118,
    '생명과학': 119,
    '지구과학': 120,
    '역학과 에너지': 121,
    '물질과 에너지': 123,
    '세포와 물질대사': 125,
    '지구시스템과학': 127,
    '기후변화와 환경생태': 130,
    '전자기와 양자': 122,
    '화학 반응의 세계': 124,
    '생물의 유전': 126,
    '행성우주과학': 128,
    '융합과학 탐구': 131,
    '프런티어 사이언스': 124,

    // --- 기술/가정/정보 교과 ---
    '정보': 159,
    '데이터 과학': 161,
    '창의공학설계': 154,
    '소프트웨어와 생활': 162,
    '정보과학': 154,

    // --- 제2외국어 / 한문 교과 ---
    '한문 고전 읽기': 192,
    '일본어': 171,
    '중국어': 170,
    '일본어 회화': 188,
    '중국어 회화': 187,
    '중국 문화': 196,
    '일본 문화': 197,
    '심화 중국어': 179,
    '심화 일본어': 180,

    // --- 예술 교과 ---
    '음악 감상과 비평': 145,
    '미술 감상과 비평': 147,
    '음악 연주와 창작': 144,
    '미술 창작': 146,

    // --- 교양 / 진로 / 보건 등 ---
    '후마니타스': 202,
    '지속가능한 삶과 공동체 생활탐구': 203,
    '보건 진로 탐색': 204,
    '자기 주도적인 삶과 미래 역량 탐구': 205
};
// ▲▲▲ 설정 끝 ▲▲▲


// 수강신청 제약 조건 정의
const rules = {
    2: {
        1: { 'A': 4, 'C': 1 },
        2: { 'B': 4, 'D': 1 }
    },
    3: {
        1: { 'E': 8, 'G': 1, 'I': 1 },
        2: { 'F': 8, 'H': 1, 'I': 1 }
    }
};

// 개설 과목 데이터 (오직 선생님이 지정한 필수 과목과 엑셀 데이터만 존재합니다)
const rawCourses = [
    // --- 선생님 지정 필수 과목 ---
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
    
    // --- 엑셀 기반 선택군 A ---
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
    
    // --- 엑셀 기반 선택군 B ---
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
    
    // --- 엑셀 기반 선택군 C ---
    { id: 56, grade: 2, semester: 1, group: 'C', name: '일본어', desc: '일본어 과목입니다.' },
    { id: 57, grade: 2, semester: 1, group: 'C', name: '중국어', desc: '중국어 과목입니다.' },
    
    // --- 엑셀 기반 선택군 D ---
    { id: 58, grade: 2, semester: 2, group: 'D', name: '일본어 회화', desc: '일본어 회화 과목입니다.' },
    { id: 59, grade: 2, semester: 2, group: 'D', name: '중국어 회화', desc: '중국어 회화 과목입니다.' },
    
    // --- 엑셀 기반 선택군 E ---
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
    
    // --- 엑셀 기반 선택군 F ---
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
    
    // --- 엑셀 기반 선택군 G ---
    { id: 121, grade: 3, semester: 1, group: 'G', name: '음악 감상과 비평', desc: '음악 감상과 비평 과목입니다.' },
    { id: 122, grade: 3, semester: 1, group: 'G', name: '미술 감상과 비평', desc: '미술 감상과 비평 과목입니다.' },
    
    // --- 엑셀 기반 선택군 H ---
    { id: 123, grade: 3, semester: 2, group: 'H', name: '음악 연주와 창작', desc: '음악 연주와 창작 과목입니다.' },
    { id: 124, grade: 3, semester: 2, group: 'H', name: '미술 창작', desc: '미술 창작 과목입니다.' },
    
    // --- 엑셀 기반 선택군 I ---
    { id: 125, grade: 3, semester: 1, group: 'I', name: '지속가능한 삶과 공동체 생활탐구', desc: '지속가능한 삶과 공동체 생활탐구 과목입니다.' },
    { id: 126, grade: 3, semester: 2, group: 'I', name: '지속가능한 삶과 공동체 생활탐구', desc: '지속가능한 삶과 공동체 생활탐구 과목입니다.' },
    { id: 127, grade: 3, semester: 1, group: 'I', name: '보건 진로 탐색', desc: '보건 진로 탐색 과목입니다.' },
    { id: 128, grade: 3, semester: 2, group: 'I', name: '보건 진로 탐색', desc: '보건 진로 탐색 과목입니다.' },
    { id: 129, grade: 3, semester: 1, group: 'I', name: '자기 주도적인 삶과 미래 역량 탐구', desc: '자기 주도적인 삶과 미래 역량 탐구 과목입니다.' },
    { id: 130, grade: 3, semester: 2, group: 'I', name: '자기 주도적인 삶과 미래 역량 탐구', desc: '자기 주도적인 삶과 미래 역량 탐구 과목입니다.' }
];

const courses = rawCourses.map(course => {
    return {
        ...course,
        pdfPage: pageMapping[course.name] || 1
    };
});

let currentUser = localStorage.getItem('currentUser') || null;
let currentGrade = parseInt(localStorage.getItem('currentGrade')) || 2;
let usersData = JSON.parse(localStorage.getItem('usersData')) || {};

function init() { if (currentUser) { showApp(); } else { showLogin(); } }

function login() {
    const username = document.getElementById('username-input').value.trim();
    const grade = document.getElementById('grade-input').value;
    
    if (username === '') { alert('이름 또는 학번을 입력해주세요.'); return; }
    
    currentUser = username;
    currentGrade = parseInt(grade);
    localStorage.setItem('currentUser', currentUser);
    localStorage.setItem('currentGrade', currentGrade);
    
    if (!usersData[currentUser]) { usersData[currentUser] = []; }

    // ▼▼▼ 강력한 청소 기능 추가 ▼▼▼
    // 1. 현재 공식 courses 목록에 완전히 똑같이 존재하는 과목만 남기고 과거의 유령 과목은 삭제합니다.
    usersData[currentUser] = usersData[currentUser].filter(enrolled => 
        courses.some(valid => valid.name === enrolled.name && valid.group === enrolled.group)
    );

    // 2. 다른 학년의 과목이나 기존의 '지정' 과목을 수강 내역에서 비웁니다.
    usersData[currentUser] = usersData[currentUser].filter(c => c.grade === currentGrade && c.group !== '지정');
    
    // 3. 새롭게 세팅된 해당 학년의 '지정' 과목을 수강 내역에 강제 추가합니다.
    const mandatoryCourses = courses.filter(c => c.grade === currentGrade && c.group === '지정');
    mandatoryCourses.forEach(mandatory => {
        usersData[currentUser].push(mandatory);
    });
    // ▲▲▲ 청소 기능 끝 ▲▲▲
    
    saveData(); 
    document.getElementById('username-input').value = '';
    showApp();
}

function logout() { 
    currentUser = null; 
    localStorage.removeItem('currentUser'); 
    localStorage.removeItem('currentGrade');
    showLogin(); 
}

function showLogin() { document.getElementById('login-container').style.display = 'block'; document.getElementById('app-container').style.display = 'none'; }

function showApp() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('app-container').style.display = 'block';
    document.getElementById('user-greeting').innerText = `${currentGrade}학년 ${currentUser}님`;
    render();
}

function getEnrolledCount(semester, group) {
    return (usersData[currentUser] || []).filter(c => c.semester === semester && c.group === group).length;
}

function render() {
    let enrolledCourses = usersData[currentUser] || [];
    const courseListDiv = document.getElementById('course-list');
    const myCoursesDiv = document.getElementById('my-courses');
    const keyword = document.getElementById('search-input').value.toLowerCase();

    courseListDiv.innerHTML = '';
    myCoursesDiv.innerHTML = '';

    const filteredCourses = courses.filter(c => 
        c.grade === currentGrade && 
        (c.name.toLowerCase().includes(keyword) || c.desc.toLowerCase().includes(keyword))
    );

    if (filteredCourses.length === 0) {
        courseListDiv.innerHTML = '<p>결과가 없습니다.</p>';
    } else {
        const semesters = [1, 2];
        
        semesters.forEach(semester => {
            const coursesInSem = filteredCourses.filter(c => c.semester === semester);
            if (coursesInSem.length > 0) {
                const semWrapper = document.createElement('div');
                semWrapper.className = 'grade-wrapper';
                semWrapper.innerHTML = `<div class="grade-header">${currentGrade}학년 ${semester}학기 과목</div>`;
                courseListDiv.appendChild(semWrapper);

                const groups = [...new Set(coursesInSem.map(c => c.group))];
                
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
                            const isEnrolled = enrolledCourses.some(e => e.id === course.id);
                            
                            let btnHtml = '';
                            if (group === '지정') {
                                btnHtml = `<button class="btn-disabled" disabled>필수지정</button>`;
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
                        courseListDiv.appendChild(groupBox);
                    }
                });
            }
        });
    }

    if (enrolledCourses.length === 0) {
        myCoursesDiv.innerHTML = '<p>내역 없음</p>';
    } else {
        [1, 2].forEach(semester => {
            const semCourses = enrolledCourses.filter(c => c.semester === semester);
            if (semCourses.length > 0) {
                const semHeader = document.createElement('div');
                semHeader.className = 'semester-header';
                semHeader.innerText = `${semester}학기 수강 목록`;
                myCoursesDiv.appendChild(semHeader);

                semCourses.forEach(course => {
                    const isMandatory = course.group === '지정';
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.style.marginBottom = '10px';
                    card.innerHTML = `
                        <div style="font-size:14px; font-weight:bold;">${course.name}</div>
                        <div style="font-size:12px; color:#666;">${course.group === '지정' ? '필수지정' : `선택 ${course.group}`}</div>
                        ${isMandatory ? '' : `<button class="btn-cancel" onclick="cancelCourse(${course.id})" style="padding:4px; margin-top:5px; width:100%;">수강 취소</button>`}
                    `;
                    myCoursesDiv.appendChild(card);
                });
            }
        });
    }
}

function enrollCourse(id) {
    const course = courses.find(c => c.id === id);
    if (!course) return;

    if (course.group !== '지정') {
        const maxCount = rules[currentGrade][course.semester][course.group];
        const currentCount = getEnrolledCount(course.semester, course.group);
        if (currentCount >= maxCount) {
            alert(`선택 ${course.group} 군은 최대 ${maxCount}개까지만 선택할 수 있습니다.`);
            return;
        }
    }

    if (!usersData[currentUser].some(e => e.id === id)) {
        usersData[currentUser].push(course);
        saveData();
        render();
    }
}

function cancelCourse(id) { 
    const course = usersData[currentUser].find(e => e.id === id);
    if (course && course.group === '지정') {
        alert('지정 과목은 취소할 수 없습니다.');
        return;
    }
    usersData[currentUser] = usersData[currentUser].filter(e => e.id !== id); 
    saveData(); 
    render(); 
}

function submitCourses() {
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
        alert('축하합니다! 모든 수강신청 조건을 완벽하게 충족하여 제출이 완료되었습니다.');
    } else {
        alert('아직 조건이 부족합니다!\n\n[부족한 항목]\n' + missingMessages.join('\n'));
    }
}

function saveData() { localStorage.setItem('usersData', JSON.stringify(usersData)); }

function showDetail(id) {
    const course = courses.find(c => c.id === id);
    document.getElementById('modal-title').innerText = course.name;
    document.getElementById('modal-category').innerText = `${course.grade}학년 / ${course.semester}학기 / ${course.group === '지정' ? '지정' : `선택 ${course.group}`}`;
    
    document.getElementById('modal-pdf-viewer').src = `guide.pdf#page=${course.pdfPage}`;
    
    document.getElementById('modal').style.display = 'block';
}

function closeModal() { 
    document.getElementById('modal').style.display = 'none'; 
    document.getElementById('modal-pdf-viewer').src = "";
}

window.onclick = function(event) { if (event.target == document.getElementById('modal')) closeModal(); }
document.getElementById('search-input').addEventListener('input', render);
init();