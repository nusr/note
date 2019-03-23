import java.io.*;
import java.net.*;
public class Spider {
 public static void main(String[] args) {
  String url = "http://www.baidu.com";
  String result = sendGet(url);
  System.out.println(result);
 }
 static String sendGet(String url){
  String result = "";
  BufferedReader in = null;
  try {
   URL realUrl = new URL(url);
   URLConnection connection = realUrl.openConnection();
   connection.connect();
   in = new BufferedReader(new InputStreamReader(
     connection.getInputStream()));
   String line;
   while ((line = in.readLine()) != null) {
    result += line;
   }
  } catch (Exception e) {
   System.out.println("get failed! " + e);
   e.printStackTrace();
  }
  finally {
   try {
    if (in != null) {
     in.close();
    }
   } catch (Exception e2) {
    e2.printStackTrace();
   }
  }
  return result;
 }

}