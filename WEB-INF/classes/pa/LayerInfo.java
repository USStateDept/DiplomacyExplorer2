package pa;

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

public class LayerInfo {

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

	    for (int i = 0; i < listOfFiles.length; i++) {
	      if (listOfFiles[i].isFile()) {
	      	try{
	      		JSONObject tempObj = (JSONObject) parser.parse(new FileReader(listOfFiles[i].getPath()));
	      		String tempFilename = listOfFiles[i].getName().replaceFirst("[.][^.]+$", "");
	      		String[] tempparts = tempFilename.split("_");
	      		if (mainObj.get(tempparts[0]) != null){
	      			//then the main key is part of the mainObj, so append
		      		if (tempparts.length > 1){
		      			//this is a sub category
		      			JSONObject subkeytemp1 = (JSONObject) mainObj.get(tempparts[0]);
		      			JSONObject subkeytemp2 = (JSONObject) subkeytemp1.get("layers");
		      			subkeytemp2.put(tempparts[1], tempObj);
		      		}
		      		else {
		      			//this is a main category
			      		JSONObject mainkeytempobj = (JSONObject) mainObj.get(tempparts[0]);
			      		mainkeytempobj.put("categoryDescription", (String) tempObj.get("categoryDescription"));
		 
		      		}
	      		}
	      		//they mainkey obj is already part of of the mainobj so create new
	      		else {
	      			
		      		if (tempparts.length > 1){
		      			//this is a sub category
		      			JSONObject subtemp1 = new JSONObject();
		      			subtemp1.put(tempparts[1], tempObj);
		      			JSONObject subtemp2 = new JSONObject();
		      			subtemp2.put("layers", subtemp1);
		      			mainObj.put(tempparts[0], tempObj);
		      		}
		      		else {
		      			//this is a main category
		      			tempObj.put("layers", new JSONObject());
		      			mainObj.put(tempparts[0], tempObj);
		      		}
	      		}

	      	}
	      	catch (ParseException e){
	      		//do something;
	      	}
	      } 
	    }

	    return mainObj.toString();
 	}

 	protected String parseHashMap (HashMap newJSON) throws IOException {
 		// use this in the future to write the file
 		//PrintWriter writer = new PrintWriter(".\\webapps\\DiplomacyExplorer2\\jsonFile\\jsonLayerFile.json", "UTF-8");		

		//writer.println("The first line");
		//writer.close();
		return "success writing the files";
		

 	}

	public String getLayerInfo() {
		
		String folderloc = ".\\webapps\\DiplomacyExplorer2\\jsonFile\\";
		String returnvalue = "{}";

		try{
			returnvalue = readAllLayerFiles(folderloc);
		}
		catch (IOException e){
			//do something here
		}

		//HashMap tester = new HashMap();

    	//String fileloc = ".\\webapps\\DiplomacyExplorer2\\jsonFile\\jsonLayerFile.json";
		//successfactor = this.parseHashMap(tester);
		//String successfactor = this.printLayerJSON(fileloc);



		return returnvalue;

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