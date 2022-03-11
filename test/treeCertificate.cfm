<cftry>

		<cfset recipientName = "John Doe">
		<cfif structkeyexists(form, 'form-recipient-name')>
			<cfset recipientName = form["form-recipient-name"]>
		</cfif>

		<cfset senderName = "Philip Perry">
		<cfif structkeyexists(form, 'form-sender-name')>
			<cfset senderName = form["form-sender-name"]>
		</cfif>

		<cfset numberOfTrees = "5 Trees Planted in Alberta">
		<cfif structkeyexists(form, 'form-number-of-trees')>
			<cfset numberOfTrees = form["form-number-of-trees"]>
		</cfif>

		<cfset dateOfCertificate = "2021-12-25">
		<cfif structkeyexists(form, 'form-date-of-certificate')>
			<cfset dateOfCertificate = form["form-date-of-certificate"]>
		</cfif>

		<cfset partner = "AMERICAN_FORESTS">
		<cfif structkeyexists(form, 'form-partner')>
			<cfset partner = form["form-partner"]>
		</cfif>

		<cfset treeImage = "PINE">
		<cfif structkeyexists(form, 'form-tree-image')>
			<cfset treeImage = form["form-tree-image"]>
		</cfif>

		<cfoutput>
			<form method="post">
				<table border="0">
					<tr>
						<td>
							Recipient
						</td>
						<td>
							<input type="text" id="form-recipient-name" name="form-recipient-name" value="#recipientName#">
						</td>
					</tr>
					<tr>
						<td>
							Sender
						</td>
						<td>
							<input type="text" id="form-sender-name" name="form-sender-name" value="#senderName#">
						</td>
					</tr>
					<tr>
						<td>
							Number Of Trees
						</td>
						<td>
							<input type="text" id="form-number-of-trees" name="form-number-of-trees" value="#numberOfTrees#">
						</td>
					</tr>
					<tr>
						<td>
							Date
						</td>
						<td>
							<input type="text" id="form-date-of-certificate" name="form-date-of-certificate" value="#dateOfCertificate#">
						</td>
					</tr>
					<tr>
						<td>
							Partner
						</td>
						<td>
							<select id="form-partner" name="form-partner">
								<option value="AMERICAN_FORESTS" <cfif partner eq 'AMERICAN_FORESTS'>selected</cfif>>American Forests</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>
							Tree Image
						</td>
						<td>
							<select id="form-tree-image" name="form-tree-image">
								<option value="PINE" <cfif treeImage eq 'PINE'>selected</cfif>>Pine Trees</option>
								<option value="PALM" <cfif treeImage eq 'PALM'>selected</cfif>>Palm Trees</option>
								<option value="FOREST" <cfif treeImage eq 'FOREST'>selected</cfif>>Forest</option>
							</select>
						</td>
					</tr>
					<tr>
						<td colspan="1">
							<input type="submit" value="Create Tree Certificate">
						</td>
					</tr>
				</table>
			</form>
		</cfoutput>

		<cfif not StructIsEmpty(form)>

			<!--- <cfdump var="#form#"> --->

			<cfset createCertificatePayload = StructNew()>
			<cfset createCertificatePayload['recipientName'] = form["form-recipient-name"]>
			<cfset createCertificatePayload['senderName'] = form["form-sender-name"]>
			<cfset createCertificatePayload['numberOfTrees'] = form["form-number-of-trees"]>
			<cfset createCertificatePayload['dateOfCertificate'] = form["form-date-of-certificate"]>
			<cfset createCertificatePayload['partner'] = form["form-partner"]>
			<cfset createCertificatePayload['treeImage'] = form["form-tree-image"]>

			<cfhttp url="https://pdf.florist.one/prod/treeCertificate" method="post" getAsBinary="yes" charset="utf-8">
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
