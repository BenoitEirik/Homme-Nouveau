package com.benoiteirik.hn;

import android.os.AsyncTask;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;

@CapacitorPlugin(name = "Bridge")
public class BridgePlugin extends Plugin {
    private String baseURL = "https://www.hommenouveau.fr/";
    private JSObject json;

    // Bridge data between back and front
    private PluginCall homeMetadataCall;
    private PluginCall articleDataCall;
    private PluginCall categoriesDataCall;


    @PluginMethod()
    public void echo(PluginCall call) {
        String value = call.getString("value");
        Log.d("MSG:", " " + value);
        JSObject ret = new JSObject();
        ret.put("value", value);
        call.resolve(ret);
    }

    @PluginMethod()
    public void  getHomeMetadata(PluginCall call) {
        homeMetadataCall = call;
        AsyncTask<String, Void, Void> metadata = new HomeArticlesMetadata().execute(baseURL);
    }

    @PluginMethod()
    public void  getArticleData(PluginCall call) {
        articleDataCall = call;
        String url = articleDataCall.getString("url");
        AsyncTask<String, Void, Void> articleData = new ArticleData().execute(url);
    }

    @PluginMethod()
    public void getCategoriesData(PluginCall call) {
        categoriesDataCall = call;
        AsyncTask<String, Void, Void> categoriesData = new CategoriesData().execute(baseURL);
    }

    private class HomeArticlesMetadata extends AsyncTask<String, Void, Void> {

        @Override
        protected Void doInBackground(String... params) {
            try {
                Document doc = Jsoup.connect(params[0]).timeout(0).get();

                json = new JSObject();
                JSONArray primaryArticles = new JSONArray();
                JSONArray secondaryArticles = new JSONArray();

                // Get swiper articles
                Elements primaryArticleElements = doc.select("#aLaUne #diapo .viewport .overview li");
                int index = 0;
                for (Element el : primaryArticleElements) {
                    JSONObject infoArticle = new JSONObject();
                    infoArticle.put("id", index);
                    infoArticle.put("url", el.select(".titreDiapo").attr("href"));
                    infoArticle.put("img", el.select("a img").attr("src"));
                    infoArticle.put("title", el.select(".titreDiapo").text());
                    infoArticle.put("description", el.select("#accroche").text());

                    primaryArticles.put(infoArticle);
                    index++;
                }

                // Get last articles
                Elements secondaryArticleElements = doc.select("#aLaUne-suite article");
                index = 0;
                for (Element el : secondaryArticleElements) {
                    JSONObject infoArticle = new JSONObject();
                    infoArticle.put("id", index);
                    infoArticle.put("url", el.select("a").attr("href"));
                    infoArticle.put("img", el.select("a .conteneurImg img").attr("src"));
                    infoArticle.put("title", el.select("a h1").text());
                    infoArticle.put("detail", el.select("a .detailBillet").text());
                    infoArticle.put("description", el.select("a .fck p").text());

                    secondaryArticles.put(infoArticle);
                    index++;
                }

                // Join the json object
                json.put("primaryArticles", primaryArticles);
                json.put("secondaryArticles", secondaryArticles);
            } catch (IOException | JSONException e) {
                System.out.println(e);
            }

            return null;
        }

        protected void onPostExecute(Void result) {
            homeMetadataCall.resolve(json);
        }
    }

    private class ArticleData extends AsyncTask<String, Void, Void> {

        @Override
        protected Void doInBackground(String... params) {
            try {
                Document doc = Jsoup.connect(params[0]).timeout(0).get();

                json = new JSObject();

                // Get swiper articles
                Elements el = doc.select("#contenu #texte");
                JSONObject article = new JSONObject();
                json.put("title", el.select("h1").text());
                json.put("content", el.select(".fck").html());

            } catch (IOException e) {
                System.out.println(e);
            }

            return null;
        }

        protected void onPostExecute(Void result) {
            articleDataCall.resolve(json);
        }
    }

    private class CategoriesData extends AsyncTask<String, Void, Void> {

        @Override
        protected Void doInBackground(String... params) {

            try {
                Document doc = Jsoup.connect(params[0]).timeout(0).get();

                json = new JSObject();

                // Get categories
                Elements categoriesElements = doc.select("#menuMobile ul:eq(1) li");
                JSONArray data = new JSONArray();

                for (Element el : categoriesElements) {
                    JSONObject infoCategory = new JSONObject();
                    infoCategory.put("name", el.select("a").text());
                    infoCategory.put("url", el.select("a").attr("href"));

                    data.put(infoCategory);
                }
                json.put("categories", data);
            } catch (IOException | JSONException e) {
                e.printStackTrace();
            }

            return null;
        }

        protected void onPostExecute(Void result) {
            categoriesDataCall.resolve(json);
        }
    }
}
