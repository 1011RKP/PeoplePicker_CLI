(function () {

    $.ajax(
        {
            'url': _spPageContextInfo.siteAbsoluteUrl + "/_api/contextinfo",
            'method': 'POST',
            method: "POST",
            headers: {
                "accept": "application/json;odata=verbose"
            },
            'success': function (data) {
                var requestDigest = data.d.GetContextWebInformation.FormDigestValue;
                var restSource = _spPageContextInfo.siteAbsoluteUrl + "/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser";
                $.ajax(
                    {
                        'url': restSource,
                        'method': 'POST',
                        'data': JSON.stringify({
                            'queryParams': {
                                '__metadata': {
                                    'type': 'SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters'
                                },
                                'AllowEmailAddresses': true,
                                'AllowMultipleEntities': false,
                                'AllUrlZones': false,
                                'MaximumEntitySuggestions': 50,
                                'PrincipalSource': 15,
                                'QueryString': "rpal"

                            }
                        }),
                        'headers': {
                            'accept': 'application/json;odata=verbose',
                            'content-type': 'application/json;odata=verbose',
                            'X-RequestDigest': requestDigest
                        },
                        'success': function (data) {
                            debugger;
                            console.log(data);

                        },
                        'error': function (err) {
                            debugger;
                            alert(JSON.stringify(err));
                        }
                    })

            },
            'error': function (err) {
                debugger;
                alert(JSON.stringify(err));
            }
        })

})();
