<h1>Backend</h1>
<p>Second assignemnt to implemnt Key value based database on a plain file.</p>
<h2>How to run</h2>
<ul>
  <li>Download the repository first.</li>
  <li>It was build over Nodejs. so you need Nodejs to run. click here to setup Nodejs <a href="https://www.guru99.com/download-install-node-js.html">link</a> </li>
  <li>Then get into the project folder.</li>
  <li>Then run this server by the command <code>node main.js</code></li>
  <li>On console you see <code>Server runing on port 3000.....</code></li>
  <li>I used postmain to verify the calls. So I reqest you also to follow the same.  </li>
</ul>

<h2>API calls</h2>
<p>CRU(create, read, delete operations were implementd over the database).</p>
<p>List of calls</p>
<ul>
 <li><code>http://localhost:3000/get/{your key value}</code> - replace your key here so it replay with the JSON object if it exist.</li>
 <li><code>http://localhost:3000/get/all</code> - This is optional one i created this for testing purpose it respond with key-value pairs </li>
 <li><code>http://localhost:3000/delete/{your key value}</code> - replace your key here so it the coressponding key-value pair is deleted if it exist.</li>
 <li><code>http://localhost:3000/create/</code> - Add the data on request body in requested format so the value get inserted</li>
 </ul>
 <p>Except create call all others are <code>GET</code> method. Create only <code>POST</code> method.
 If  insufficient data, calling expired key value, exidend limis of key and value then error is shown as 404. 
   
<h2>Restriction on creating data</h2>
<ul>
<li>Maximum sixze of database file - 1GB</li>
<li>Maximum lenth of key - 32 characters</li>
<li>Maximum size of value - 64 KB of JSON object</li>
</ul>

<h2>Create data</h2>

<p>Create data requires body data of specific format.
  <pre>
<code>
  {
  "key":"{your key}",
  "value":"{your value as JSON object}"
  "ttl":{int value}
  }
  </pre>
 </code>
 
 <li>ttl - is optional</li>
 
</p>

