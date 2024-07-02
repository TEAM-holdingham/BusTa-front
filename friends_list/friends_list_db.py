import sqlite3

# 데이터베이스 파일 생성 및 연결
conn = sqlite3.connect('friends.db')
c = conn.cursor()

# 테이블 생성
c.execute('''
    CREATE TABLE friends (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nickname TEXT NOT NULL
    )
''')

# 초기 데이터 삽입
friends = [
    ('지존예진..-_^',),
    ('나는채연아가야',),
    ('최강예현',),
    ('허다닥',)
]

c.executemany('INSERT INTO friends (nickname) VALUES (?)', friends)

# 변경 사항 저장 및 연결 종료
conn.commit()
conn.close()

print("Database and table created with initial data.")
