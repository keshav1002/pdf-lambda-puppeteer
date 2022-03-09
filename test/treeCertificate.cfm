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
					<td>
						Number Of Trees
					</td>
					<td>
						<input type="text" id="form-number-of-trees" name="form-number-of-trees" value="5 Trees Planted in Alberta">
					</td>
				</tr>
				<tr>
					<td>
						Date
					</td>
					<td>
						<input type="text" id="form-date-of-certificate" name="form-date-of-certificate" value="2021-12-25">
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
			<cfset createCertificatePayload['numberOfTrees'] = form["form-number-of-trees"]>
			<cfset createCertificatePayload['dateOfCertificate'] = form["form-date-of-certificate"]>

			<cfhttp url="https://y3t13lz4q1.execute-api.us-west-2.amazonaws.com/prod/treeCertificate" method="post" getAsBinary="yes">
				<cfhttpparam type="body" value="#serializejson(createCertificatePayload)#">
			</cfhttp>
			<cffile action="write" file="C:/inetpub/wwwroot/FHW-Solutions/TreeCertificate.pdf" output="#cfhttp.FileContent#">

			<!--- <cfdump var="#cfhttp#"> --->

			<iframe src="https://dev.fhwsolutions.com/TreeCertificate.pdf" title="" width="1375" height="1063"></iframe>

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
