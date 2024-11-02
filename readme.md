# 多人協同合作專案

## 組員分工

1.翁寬 會員<br> 2.張凱智 商品出售<br> 3.王睦期 商品出租<br> 4.劉明舜 官方文章討論區<br> 5.葉治辰 購物車<br> 6.李錦志 優惠券



## Git


**GIT執行操作前先確認目錄和所在分支**
<br>

開始


1. 把專案clone到本地<br>
git clone https://專案.git .

2. 新建並切換到新分支<br>
git checkout -b Name_dev

3. 完成變更、修改之後把變動加入暫存<br>
git add .

4. 把剛剛暫存的儲存變成一個版本並加入備註<br>
git commit -m "備註"

5. 切換分支到dev並把Name_dev合併過去<br>
git checkout dev
git merge --no-ff -m "備註" Name_dev

6. 把更動push上github<br>
git push origin dev


---

後續更動專案之前


1. 分支切換到dev<br>
git checkout dev

2. 把dev更新到最新狀態<br>
git pull origin dev

3. 接著將分支切回個人分支<br>
git checkout Name_dev

4. 將最新的dev合併到個人分支<br>
git merge dev

<br>
    *如果有解決衝突、修改、更動之後重複:<br>
    git add .<br>
    git commit -m "備註"<br>
    git checkout dev<br>
    git merge --no-ff -m "備註" Name_dev<br>
    git push origin dev<br>


---

**測試會員登入**
<br>

1. server根目錄的.env.example複製一份並改名.env並自行更改相應環境變數<br>

2. 啟動XAMPP將Apache與MySQL打開<br>

3. 新增一個資料庫，名稱final_project<br>

4. 把專案底下的final_project.sql匯入<br>

5. 在終端機開啟client端，執行npm run dev<br>

6. 在終端機開啟server端，執行npm run dev<br>

7. 瀏覽器中開啟 http://localhost:3000/ 或 http://localhost:3000/testLogin 測試登入功能

<br><br>
目前頁面路由還沒完成，所以直接點登入會找不到頁面，必須手動更改網頁
<br>
測試帳號：test1
<br>
測試密碼：123456