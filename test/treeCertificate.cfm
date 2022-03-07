<cftry>

		<form method="post">
			<table border="0">
				<tr>
					<td>
						Recipient
					</td>
					<td>
						<input type="text" id="form-recipient-name" name="form-recipient-name" value="Brian Gomes">
					</td>
				</tr>
				<tr>
					<td>
						Sender
					</td>
					<td>
						<input type="text" id="form-sender-name" name="form-sender-name" value="Philip Perry">
					</td>
				</tr>
				<tr>
					<td colspan="1">
						<input type="submit" value="Create Tree Certificate">
					</td>
				</tr>
			</table>
		</form>

		<cfif not StructIsEmpty(form)>

			<!--- <cfdump var="#form#"> --->

			<cfset createCertificatePayload = StructNew()>
			<cfset createCertificatePayload['recipientName'] = form["form-recipient-name"]>
			<cfset createCertificatePayload['senderName'] = form["form-sender-name"]>

			<cfhttp url="https://y3t13lz4q1.execute-api.us-west-2.amazonaws.com/prod/treeCertificate" method="post" getAsBinary="yes">
				<cfhttpparam type="body" value="#serializejson(createCertificatePayload)#">
			</cfhttp>
			<cffile action="write" file="C:/inetpub/wwwroot/FHW-Solutions/abc.pdf" output="#cfhttp.FileContent#">

			<!--- <cfdump var="#cfhttp#"> --->

			<iframe src="https://dev.fhwsolutions.com/abc.pdf" title="" width="1000" height="500"></iframe>

		</cfif>

		<!--- <cfdump var="#cfhttp.filecontent#">

		<cfpdf
			action="sanitize"
			source = "#cfhttp.filecontent.toByteArray()#"
			destination = "C:/inetpub/wwwroot/FHW-Solutions/abc.pdf">	 --->

  <cfcatch type="any">
    <cfdump var="#cfcatch#">
  </cfcatch>

</cftry>
