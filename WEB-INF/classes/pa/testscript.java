//package pa;

//import java.sql.*;
import java.io.IOException;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.*;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.File;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

class LayerInfoTester {

/*
Depending on the edit form, maybe we can split each layer into a file, then only one file at a time will be edited, which solve the issue of two people editing

    */


 	private HashMap parseStringFile(String fileloc){
 		BufferedReader reader = null;
 		HashMap list = new HashMap();
		try {
		    reader = new BufferedReader(new FileReader(fileloc));
		    String text = null;

		    while ((text = reader.readLine()) != null) {
		        list.put("a", Integer.parseInt(text));
		    }
		} catch (FileNotFoundException e) {
		    e.printStackTrace();
		} catch (IOException e) {
		    e.printStackTrace();
		} finally {
		    try {
		        if (reader != null) {
		            reader.close();
		        }
		    } catch (IOException e) {
		    }
		}

		//parse list to this

		HashMap tester = new HashMap();

		tester.put("1", "a");
		tester.put("2", "b");
		return tester;

 	}


 	protected String printLayerJSON (String fileloc) {
  		BufferedReader reader = null;
 		String returntext = "";
		try {
		    reader = new BufferedReader(new FileReader(fileloc));
		    String text = null;

		    while ((text = reader.readLine()) != null) {
		    	returntext = returntext + text + "\n";
		    }
		} catch (FileNotFoundException e) {
		    e.printStackTrace();
		} catch (IOException e) {
		    e.printStackTrace();
		} finally {
		    try {
		        if (reader != null) {
		            reader.close();
		        }
		    } catch (IOException e) {
		    }
		}
		return returntext;
 	}

 	public static String readAllLayerFiles(String folderloc) throws IOException {
 		//build the layer JS array from all JSON Files
 		File folder = new File(folderloc);
		File[] listOfFiles = folder.listFiles();

		JSONObject mainObj = new JSONObject();
		JSONParser parser = new JSONParser();
		JSONArray a = new JSONArray();

	    for (int i = 0; i < listOfFiles.length; i++) {
	      if (listOfFiles[i].isFile()) {
	      	try{
	      		a = (JSONArray) parser.parse(new FileReader(listOfFiles[i].getPath()));
	      	}
	      	catch (ParseException e){
	      		a = null;
	      	}
	        //successfactor = successfactor + "File " + listOfFiles[i].getName();
	      } 
	    }



/*
 Object obj=JSONValue.parse(s);
  JSONArray array=(JSONArray)obj;
  System.out.println("======the 2nd element of array======");
  System.out.println(array.get(1));
  System.out.println();
                
  JSONObject obj2=(JSONObject)array.get(1);
  System.out.println("======field \"1\"==========");
  System.out.println(obj2.get("1")); 

*/





	    return a.toString();
 	}

 	protected String parseHashMap (HashMap newJSON) throws IOException {
 		// use this in the future to write the file
 		//PrintWriter writer = new PrintWriter(".\\webapps\\DiplomacyExplorer2\\jsonFile\\jsonLayerFile.json", "UTF-8");		

		//writer.println("The first line");
		//writer.close();
		return "success writing the files";
		
	}

	public static void main(String[] args) {

	//public String getLayerInfo() {
		
		String folderloc = ".\\webapps\\DiplomacyExplorer2\\jsonFile\\";
		String returnvalue = "nothing to return";

		try{
			returnvalue = readAllLayerFiles(folderloc);
		}
		catch (IOException e){
			returnvalue = "error in reading";
		}

		//HashMap tester = new HashMap();

    	//String fileloc = ".\\webapps\\DiplomacyExplorer2\\jsonFile\\jsonLayerFile.json";
		//successfactor = this.parseHashMap(tester);
		//String successfactor = this.printLayerJSON(fileloc);



		System.out.print(returnvalue);

	}
}
/*
JSONArray a = (JSONArray) parser.parse(new FileReader("c:\\exer4-courses.json"));

  for (Object o : a)
  {
    JSONObject person = (JSONObject) o;

    String name = (String) person.get("name");
    System.out.println(name);

    String city = (String) person.get("city");
    System.out.println(city);

    String job = (String) person.get("job");
    System.out.println(job);

    JSONArray cars = (JSONArray) jsonObject.get("cars");

    for (Object c : cars)
    {
      System.out.println(c+"");
    }
  }
  */