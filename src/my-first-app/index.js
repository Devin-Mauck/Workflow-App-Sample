import Kviews from './kviews';

const calendlyApp = 'Calendly_App'
// When trying to install or use this template, make sure to postfix the `app` property below with a unique value.
// For example, my_first_app__myKustomerOrg01_01
export default {
    app: calendlyApp,
    version: '4.0.0',
    appDetails: { // note: the object and all it's fields are optional, but will be used to fill out the app store listing within Kustomer
        appDeveloper: {
            name: '<<Devin Mauck',
            website: '<<Insert the developer\'s website>>',
            supportEmail: 'example@email.com',
        },
        externalPlatform: {
            name: 'Calendly',
            website:'https://calendly.com',
        },
        documentationLinks: [{
            title: '<<Insert the display title for your documentation>>',
            url: 'www.example.com',
        }],
    },
    title: 'Calendly',
    description: 'Calendly App',
    iconUrl: 'https://pbs.twimg.com/profile_images/1146053597785993217/DcPQyO9Q_400x400.png',
    postInstallMessage: 'Congratulations! You\'ve installed Calendly',
    kviews: Kviews,
    hooks: [
        {
            eventName: `kustomer.app.${calendlyApp}.update-event`,
            displayEventName: 'Calendly Event Update Hook',
            type: 'form',
            description: 'Sync Calendly Event Updates'
        }
    ],
    triggers: [
        {
            eventName: `kustomer.app.${calendlyApp}.update-event`,
            description: 'A Calendly event update',
        }
    ],
    settings: {
        default: {
          authToken: {
            type: 'secret',
            defaultValue: '',
            required: true
          }
        }
      },
      actions: [
        {
          name: `kustomer.app.${calendlyApp}.get-request`,
          type: 'rest_api',
          appSettings: {
            authToken: {
              key: `${calendlyApp}.default.authToken`
            }
          },
          inputTemplate: {
            uri: '{{{uri}}}',
            method: 'GET',
            headers: {
              authorization: 'Bearer {{{authToken}}}',
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            json: true
          },
          inputSchema: {
            type: 'object',
            properties: {
              uri: {
                type: 'string'
              }
            },
            required: [
              'uri'
            ],
            additionalProperties: false
          },
          outputTemplate: {
            response: '/#response',
            body: '/#body'
          },
          outputSchema: {
            type: 'object',
            properties: {
              response: {
                type: 'object'
              },
              body: {
                type: 'object'
              }
            },
            additionalProperties: false
          }
        }
      ],
      klasses: [
        {
          name: `${calendlyApp}-event`,
          icon: 'calendar',
          color: '#3e9cf0',
          metadata: {
            properties: {
              canceledStr: {
                displayName: 'Canceled'
              },
              cancelReasonStr: {
                displayName: 'Cancel Reason'
              },
              canceledDateStr: {
                displayName: 'Canceled Date'
              },
              eventDescriptionStr: {
                displayName: 'Event Description'
              },
              eventDurationNum: {
                displayName: 'Event Duration'
              },
              eventLocationStr: {
                displayName: 'Event Location'
              },
              eventNameStr: {
                displayName: 'Event Name'
              },
              eventTypeStr: {
                displayName: 'Event Type'
              },
              startTimeAt: {
                displayName: 'Start Time'
              },
              endTimeAt: {
                displayName: 'End Time'
              },
            }
          }
        }
      ],
      i18n: {
        en_us: {
          [`${calendlyApp}.settings.page.title`]: 'Calendly',
          [`${calendlyApp}.settings.page.description`]: 'Configure settings for your Calendly integration with Kustomer. Fill out these fields after generating an access token on the Calendly site. [Learn more](https://help.kustomer.com/en_us/integrate-with-calendly-SkjppgFpv)',
          [`${calendlyApp}.settings.path.default.authToken.displayName`]: 'Calendly API Token',
          [`${calendlyApp}.settings.path.default.authToken.description`]: "Locate this on [Calendly's API & Webhooks](https://calendly.com/integrations/api_webhooks) page."
        }
      },
      kviews: [
        {
          resource: `kobject.${calendlyApp}-event`,
          template: "const data = this;\n\n<div>\n  {_.get(data, 'kobject.custom') ?\n<Segment>\n  <Grid>\n    <Column size=\"eight\">\n      <h4>Invitation Information</h4>\n      <Field\n        field=\"eventTypeStr\"\n        key=\"eventTypeStr\"\n        type=\"kobject.Calendly_App-event\"\n        value={object.custom.eventTypeStr}\n      />\n      <Field\n        field=\"eventNameStr\"\n        key=\"eventNameStr\"\n        type=\"kobject.Calendly_App-event\"\n        value={object.custom.eventNameStr}\n      />\n      <Field\n        field=\"eventDescriptionStr\"\n        key=\"eventDescriptionStr\"\n        type=\"kobject.Calendly_App-event\"\n        value={object.custom.eventDescriptionStr}\n      />\n      <BasicField\n        label=\"Event Duration\"\n        value={`${_.get(data, 'kobject.custom.eventDurationNum').toString()} minutes`}\n      />\n      <Field\n        field=\"startTimeAt\"\n        key=\"startTimeAt\"\n        type=\"kobject.Calendly_App-event\"\n        value={object.custom.startTimeAt}\n      />\n      <Field\n        field=\"endTimeAt\"\n        key=\"endTimeAt\"\n        type=\"kobject.Calendly_App-event\"\n        value={object.custom.endTimeAt}\n      />\n      </Column>\n    <Column size=\"eight\">\n      <h4>Cancelation Details</h4>\n      <Field\n        field=\"canceledStr\"\n        key=\"canceledStr\"\n        type=\"kobject.Calendly_App-event\"\n        value={object.custom.canceledStr}\n      />\n      <Field\n        field=\"cancelReasonStr\"\n        key=\"cancelReasonStr\"\n        type=\"kobject.Calendly_App-event\"\n        value={object.custom.cancelReasonStr}\n      />\n   <Field\n        field=\"canceledDateStr\"\n        key=\"canceledDateStr\"\n        type=\"kobject.Calendly_App-event\"\n        value={object.custom.canceledDateStr}\n      />\n      </Column>\n  </Grid>\n  <Grid>\n    <Column size=\"sixteen\">\n      <h4>Questions / Answers</h4>\n      {(() => {\n        \tconst lineItems = _.get(data, 'kobject.data.payload.questions_and_answers');\n          return lineItems.map((lineItem) => {\n          \treturn (<div>\n            \t<Grid>\n             \t\t<Column size=\"sixteen\">\n                \t<BasicField label=\"Question\" value={_.get(lineItem, 'question')}/>\n                  <BasicField label=\"Answer\" value={_.get(lineItem, 'answer')}/>\n                </Column>\n             </Grid>\n            </div>)\n          })\n    \t})()}\n    </Column>\n  </Grid>\n</Segment>\n    :\n  null\n   }\n</div>",
          context: 'expanded-timeline',
          meta: {
            displayName: `${calendlyApp}-event`,
            icon: 'calendar',
            state: 'open'
          },
          name: `kustomer.app.${calendlyApp}.calendly-event-card`
        }
      ],
      workflows:[
        {
            "description": "Workflow App Sample",
            "name": "calendly",
            "steps": [
              {
                "transitions": [],
                "errorCases": [],
                "id": "oEWqMzO_q",
                "action": "kustomer.rest-api.json",
                "appVersion": "kustomer-^1.9.2",
                "meta": {
                  "displayName": "Create Calendly Event"
                },
                "params": {
                  "uri": "/#steps.1.attributes.data.payload.event",
                  "method": "GET"
                }
              }
            ],
            "trigger": {
              "transitions": [
                {
                  "target": "oEWqMzO_q",
                  "condition": {
                    "op": "true",
                    "values": [
                      true
                    ]
                  }
                }
              ],
              "eventName": "kustomer.app.calendly_app_61a7fb3943166f00ea266016.update-event",
              "id": "1",
              "appVersion": "calendly_app_61a7fb3943166f00ea266016-^2.0.0"
            }
          }
      ],




};
