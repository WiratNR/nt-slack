function sendSlackNotification() {
  // กำหนดข้อมูลยอดขายรายวัน (ข้อมูลนี้สามารถแทนที่ด้วยข้อมูลจริงจากฐานข้อมูลหรือ API)
  var dailyData = {
    date: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy"),
    totalSales: "25,000 บาท",
    orderCount: 150,
    bestSeller: "สินค้า A",
    note: "ยอดขายเพิ่มขึ้น 10% เมื่อเทียบกับวันที่ผ่านมา",
    imageUrl: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // URL รูปภาพ
    fileUrl: "https://drive.google.com/file/d/1fdXJKx57kzElbCCjhEyK3IntUMqw1YXS/view?usp=sharing" // URL ไฟล์รายงาน
  };

  // สร้าง payload สำหรับ Slack โดยใช้ Block Kit รวมทั้งแนบรูปภาพและลิงก์ไฟล์
  var payload = {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "สรุปยอดขายรายวัน",
          emoji: true
        }
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*วันที่:*\n" + dailyData.date
          },
          {
            type: "mrkdwn",
            text: "*ยอดขายรวม:*\n" + dailyData.totalSales
          },
          {
            type: "mrkdwn",
            text: "*จำนวนออเดอร์:*\n" + dailyData.orderCount
          },
          {
            type: "mrkdwn",
            text: "*สินค้าขายดี:*\n" + dailyData.bestSeller
          }
        ]
      },
      {
        type: "image",
        image_url: dailyData.imageUrl,
        alt_text: "สรุปยอดขาย"
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*ไฟล์รายงาน:* <" + dailyData.fileUrl + "|คลิกที่นี่เพื่อดาวน์โหลด>"
        }
      },
      {
        type: "divider"
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*หมายเหตุ:*\n" + dailyData.note
        }
      }
    ]
  };

  // ระบุ Slack Webhook URL (โปรดแทนที่ YOUR_SLACK_WEBHOOK_URL ด้วย URL ของคุณ)
  var slackWebhookUrl = "WEB_HOOK_URL";

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
