# 📌 ฟังก์ชัน `sendSlackNotification()` - ส่งสรุปยอดขายรายวันไปยัง Slack

## 📝 คำอธิบาย  
ฟังก์ชันนี้ใช้ **Google Apps Script** เพื่อส่ง **สรุปยอดขายรายวัน** ไปยัง **Slack** ผ่าน **Webhook URL**  
โดยใช้ **Slack Block Kit** เพื่อแสดงข้อมูลในรูปแบบที่สวยงาม พร้อมแนบรูปภาพและลิงก์ไฟล์รายงาน  

---

## 🛠️ โครงสร้างของโค้ด  

### 1️⃣ ฟังก์ชัน `sendSlackNotification()`
```javascript
function sendSlackNotification() {
  // กำหนดข้อมูลยอดขายรายวัน
  var dailyData = {
    date: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy"),
    totalSales: "25,000 บาท",
    orderCount: 150,
    bestSeller: "สินค้า A",
    note: "ยอดขายเพิ่มขึ้น 10% เมื่อเทียบกับวันที่ผ่านมา",
    imageUrl: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f...",
    fileUrl: "https://drive.google.com/file/d/1fdXJKx57kzElbCCjhEyK3IntUMqw1YXS/view?usp=sharing"
  };

  // สร้าง Payload สำหรับส่งไปยัง Slack
  var payload = {
    blocks: [
      { type: "header", text: { type: "plain_text", text: "สรุปยอดขายรายวัน", emoji: true } },
      { 
        type: "section", 
        fields: [
          { type: "mrkdwn", text: "*วันที่:*\n" + dailyData.date },
          { type: "mrkdwn", text: "*ยอดขายรวม:*\n" + dailyData.totalSales },
          { type: "mrkdwn", text: "*จำนวนออเดอร์:*\n" + dailyData.orderCount },
          { type: "mrkdwn", text: "*สินค้าขายดี:*\n" + dailyData.bestSeller }
        ]
      },
      { type: "image", image_url: dailyData.imageUrl, alt_text: "สรุปยอดขาย" },
      { 
        type: "section", 
        text: { type: "mrkdwn", text: "*ไฟล์รายงาน:* <" + dailyData.fileUrl + "|คลิกที่นี่เพื่อดาวน์โหลด>" }
      },
      { type: "divider" },
      { type: "section", text: { type: "mrkdwn", text: "*หมายเหตุ:*\n" + dailyData.note } }
    ]
  };

  // ระบุ Slack Webhook URL (ต้องเปลี่ยนเป็นของจริง)
  var slackWebhookUrl = "https://hooks.slack.com/services/XXXX/YYYY/ZZZZ"; 

  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload)
  };

  try {
    var response = UrlFetchApp.fetch(slackWebhookUrl, options);
    Logger.log("ส่งสรุปยอดขายรายวันพร้อมสื่อไปที่ Slack สำเร็จ: " + response.getContentText());
  } catch (error) {
    Logger.log("เกิดข้อผิดพลาดในการส่งสรุปยอดขายรายวัน: " + error);
  }
}
