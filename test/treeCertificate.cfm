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

		<cfset title = "Memorial Tree Certificate">
		<cfif structkeyexists(form, 'form-title')>
			<cfset title = form["form-title"]>
		</cfif>

		<cfset recipientHeading = "In Loving Memory of">
		<cfif structkeyexists(form, 'form-recipient-heading')>
			<cfset recipientHeading = form["form-recipient-heading"]>
		</cfif>

		<cfset senderHeading = "Courtesy of">
		<cfif structkeyexists(form, 'form-sender-heading')>
			<cfset senderHeading = form["form-sender-heading"]>
		</cfif>

		<cfset dateHeading = "Date">
		<cfif structkeyexists(form, 'form-date-heading')>
			<cfset dateHeading = form["form-date-heading"]>
		</cfif>

		<cfset partnerHeading = "Planted in partnership with">
		<cfif structkeyexists(form, 'form-partner-heading')>
			<cfset partnerHeading = form["form-partner-heading"]>
		</cfif>

		<cfset footer = "Your trees improve air and water quality, restore natural habitats, and cool earth">
		<cfif structkeyexists(form, 'form-footer')>
			<cfset footer = form["form-footer"]>
		</cfif>

		<cfoutput>
			<form method="post">
				<table border="0">
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
						<td>
							Title
						</td>
						<td>
							<input type="text" id="form-title" name="form-title" value="#title#">
						</td>
					</tr>
					<tr>
						<td>
							Recipient Heading
						</td>
						<td>
							<input type="text" id="form-recipient-heading" name="form-recipient-heading" value="#recipientHeading#">
						</td>
					</tr>
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
							Number Of Trees
						</td>
						<td>
							<input type="text" id="form-number-of-trees" name="form-number-of-trees" value="#numberOfTrees#">
						</td>
					</tr>
					<tr>
						<td>
							Sender Heading
						</td>
						<td>
							<input type="text" id="form-sender-heading" name="form-sender-heading" value="#senderHeading#">
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
							Date Heading
						</td>
						<td>
							<input type="text" id="form-date-heading" name="form-date-heading" value="#dateHeading#">
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
							Partner Heading
						</td>
						<td>
							<input type="text" id="form-partner-heading" name="form-partner-heading" value="#partnerHeading#">
						</td>
					</tr>
					<tr>
						<td>
							Partner
						</td>
						<td>
							<select id="form-partner" name="form-partner">
								<option value="AMERICAN_FORESTS" <cfif partner eq 'AMERICAN_FORESTS'>selected</cfif>>American Forests</option>
								<option value="CANADIAN_INSTITUTE" <cfif partner eq 'CANADIAN_INSTITUTE'>selected</cfif>>Canadian Institute of Forestry</option>
								<option value="ONE_TREE_PLANTED" <cfif partner eq 'ONE_TREE_PLANTED'>selected</cfif>>One Tree Planted</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>
							Footer
						</td>
						<td>
							<input type="text" id="form-footer" name="form-footer" value="#footer#">
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
			<cfset createCertificatePayload['title'] = form["form-title"]>
			<cfset createCertificatePayload['recipientHeading'] = form["form-recipient-heading"]>
			<cfset createCertificatePayload['senderHeading'] = form["form-sender-heading"]>
			<cfset createCertificatePayload['dateHeading'] = form["form-date-heading"]>
			<cfset createCertificatePayload['partnerHeading'] = form["form-partner-heading"]>
			<cfset createCertificatePayload['footer'] = form["form-footer"]>

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
