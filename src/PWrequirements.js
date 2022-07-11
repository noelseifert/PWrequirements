/*

  _   _      ____
 | \ | | ___/ ___|  ___
 |  \| |/ _ \___ \ / _ \
 | |\  | (_) |__) |  __/
 |_| \_|\___/____/ \___|

  _______          __                   _                               _
 |  __ \ \        / /                  (_)                             | |
 | |__) \ \  /\  / / __ ___  __ _ _   _ _ _ __ ___ _ __ ___   ___ _ __ | |_ ___
 |  ___/ \ \/  \/ / '__/ _ \/ _` | | | | | '__/ _ \ '_ ` _ \ / _ \ '_ \| __/ __|
 | |      \  /\  /| | |  __/ (_| | |_| | | | |  __/ | | | | |  __/ | | | |_\__ \
 |_|       \/  \/ |_|  \___|\__, |\__,_|_|_|  \___|_| |_| |_|\___|_| |_|\__|___/
                               | |
                               |_|

 Version:       1.0.1
 Author:        Noel Seifert
 Website:       https://noelseifert.de
 Documentation: https://noelseifert.de/PWrequirements // yet to be created
 Repository:    https://github.com/noelseifert/PWrequirements
 Issues:        https://github.com/noelseifert/PWrequirements/issues


* */
(function ($) {
    $.fn.PWrequire = function (settings) {

        // default settings
        var defaults = {
            // Password restrictions
            minCharacter: 8,                // minimal Password length (-1 = no restriction | 0 = will not be required)
            maxCharacter: 16,               // maximal Password length (-1 = no restriction | 0 = will not be required)
            useLowercase: 0,                // number of required lowercase letters (-1 = no restriction | 0 = will not be required)
            useUppercase: 0,                // number of required uppercase letters (-1 = no restriction | 0 = will not be required)
            useNumbers: 0,                  // number of required numbers (-1 = no restriction | 0 = will not be required)
            useSpecial: 0,                  // number of required special characters (-1 = no restriction | 0 = will not be required)
            // display settings
            // display types
            // less || advanced
            // "less" only lets the user know if he/she satisfied the requirement
            // "advanced" displays the progress of the requirement's satisfaction, e.g. x out of y lowercase letters
            minCharacterDisplayType: "less",
            maxCharacterDisplayType: "less",
            lowercaseDisplayType: "less",
            uppercaseDisplayType: "less",
            numbersDisplayType: "less",
            specialDisplayType: "less",
            reqExplain: true,               // display requirements explanation text (boolean)
            style: "light",                 // display mode (light / dark)
            fadeTime: 300                   // fade out time in milliseconds when requirements are satisfied
        };

        settings = $.extend(defaults, settings);

        return this.each(function () {
            var s = settings;

            // excluding possible misconfiguration to avoid fatal errors
            if (s.maxCharacter > 0) {
                if (s.maxCharacter <= Math.abs(s.useLowercase) + Math.abs(s.useUppercase) + Math.abs(s.useNumbers) + Math.abs(s.useSpecial))
                {
                    console.error("The set maximal character amount is lower or equal to required settings. | Logic error / user unfriendly")
                    return;
                }
                else if (s.maxCharacter < Math.abs(s.minCharacter))
                {
                    console.error("The set maximal character amount is lower than the minimal password length. | Logic error")
                    return;
                }
            }

            if (s.reqExplain) {
                var pwHint =
                    `<div id="PWreq" class="PWreq-hint">\n` +
                    `  <div class="PWreq-inner">\n` +
                    `      <div class="PWreq-Explanation"><p class="characters"></p><p class="others"></p></div>\n` +
                    `      <div class="PWreq-requirements">\n` +
                    `          <ul class="PWreq-checklist">\n` +
                    `          </ul>\n` +
                    `      </div>\n` +
                    `  </div>\n` +
                    `</div>`
            }
            else {
                var pwHint =
                    `<div id="PWreq" class="PWreq-hint">\n` +
                    `  <div class="PWreq-inner">\n` +
                    `      <div class="PWreq-requirements">\n` +
                    `          <ul class="PWreq-checklist">\n` +
                    `          </ul>\n` +
                    `      </div>\n` +
                    `  </div>\n` +
                    `</div>`
            }

            if (s.style === "dark") {
                $('body, #PWreq-form').addClass('PW-darkmode');
            }
            else {
                $('body, #PWreq-form').removeClass('PW-darkmode');
            }

            // Append password hint
            $(this).parent().append(pwHint);

            // check if other requirements are set
            // setting the vars for the explanation text beforehand
            var explainLowercase = "",
                explainUppercase = "",
                explainNumbers = "",
                explainSpecial = "";

            // Class definitions
            //
            // isActive     -> checks if setting is set by user
            // isSatisfied  -> checks if required setting is matched
            // explainText  -> delivers the text snippet for the explanation text
            // lessText     -> delivers the text snippet for the checklist
            // advancedText -> delivers the text snippet for the checklist
            var characters = {
                isActive: function () {
                    return true;
                },
                isSatisfied: function () {
                    return true;
                },
                explainText: function () {
                    // check if there is a restriction set for the minimal password length
                    if (s.minCharacter > 0) {
                        // Check if there is a restriction for the maximal length of the password
                        if (s.maxCharacter > 0) {
                            return `Ihr Passwort muss mindestens ${s.minCharacter} und maximal ${s.maxCharacter} Zeichen lang sein. `;
                        }
                        // if there isn't a maximal length of the password --> use minimal password length requirement text
                        else {
                            return `Die minimale Passwortlänge beträgt ${s.minCharacter} Zeichen. `;
                        }
                    }
                    // if there is no minimal password length given, check if there is a maximal length
                    else if (s.maxCharacter > 0) {
                        return `Ihr Passwort darf maximal ${s.maxCharacter} Zeichen lang sein. `;
                    }
                },
                lessText: function () {
                    return;
                },
                advancedText: function () {
                    return;
                },
                name: 'characters'
            };
            var minCharacter = {
                isActive: function () {
                    if (s.minCharacter > 0) return true;
                    else return false;
                },
                isSatisfied: function () {
                    if ($("#PWreq-PW").val().length >= s.minCharacter) return true;
                    else return false;
                },
                explainText: function () {
                    return;
                },
                displayType: function () {
                    return s.minCharacterDisplayType;
                },
                lessText: function () {
                    if (s.minCharacter > 0) {
                        return `Mindestpasswortlänge: ${s.minCharacter} Zeichen`;
                    } else if (s.minCharacter <= 0) {
                        return;
                    }
                },
                advancedText: function () {
                    if (s.minCharacter > 0) {
                        return `Mindestpasswortlänge: ${$("#PWreq-PW").val().length} / ${s.minCharacter} Zeichen`;
                    } else if (s.minCharacter <= 0) {
                        return;
                    }
                },
                name: 'minCharacter'
            };
            var maxCharacter = {
                isActive: function () {
                    if (s.maxCharacter > 0) return true;
                    else return false;
                },
                isSatisfied: function () {
                    if ($("#PWreq-PW").val().length === s.maxCharacter) {
                        $(`.PWreq-item.` + `${u.name}`).removeClass("surplus");
                        return true;
                    } else if ($("#PWreq-PW").val().length > s.maxCharacter) {
                        $(`.PWreq-item.` + `${u.name}`).addClass("surplus");
                        return false;
                    } else if ($("#PWreq-PW").val().length < s.maxCharacter) {
                        $(`.PWreq-item.` + `${u.name}`).removeClass("surplus");
                        return false;
                    }
                },
                explainText: function () {
                    return;
                },
                displayType: function () {
                    return s.maxCharacterDisplayType;
                },
                lessText: function () {
                    if (s.maxCharacter > 0) {
                        return `Maximalpasswortlänge: ${s.maxCharacter} Zeichen`;
                    } else if (s.useLowercase <= 0) {
                        return;
                    }
                },
                advancedText: function () {
                    if (s.maxCharacter > 0) {
                        return `Maximalpasswortlänge: ${$("#PWreq-PW").val().length} / ${s.maxCharacter} Zeichen`;
                    } else if (s.maxCharacter <= 0) {
                        return;
                    }
                },
                name: 'maxCharacter'
            };
            var lowercase = {
                isActive: function () {
                    if (s.useLowercase !== 0) return true;
                    else return false;
                },
                isSatisfied: function () {
                    if (($("#PWreq-PW").val().match(/[a-z]/g) || []).length >= s.useLowercase) return true;
                    else if (s.useLowercase === -1 && ($("#PWreq-PW").val().match(/[a-z]/g) || []).length >= Math.abs(s.useLowercase)) return true;
                    else return false;
                },
                explainText: function () {
                    if (s.useLowercase > 0) {
                        return `Kleinbuchstaben: mindestens ${s.useLowercase}`;
                    } else if (s.useLowercase < 0) {
                        return `Kleinbuchstaben`;
                    }
                },
                displayType: function () {
                    return s.lowercaseDisplayType;
                },
                lessText: function () {
                    if (s.useLowercase > 0) {
                        return `Kleinbuchstaben: mindestens ${s.useLowercase}`;
                    } else if (s.useLowercase < 0) {
                        return `Kleinbuchstaben`;
                    }
                },
                advancedText: function () {
                    if (s.useLowercase > 0) {
                        return `Kleinbuchstaben: mindestens ${($("#PWreq-PW").val().match(/[a-z]/g) || []).length} / ${s.useLowercase}`;
                    } else if (s.useLowercase < 0) {
                        return `Kleinbuchstaben`;
                    }
                },
                name: 'lowercase'
            }
            var uppercase = {
                isActive: function () {
                    if (s.useUppercase !== 0) return true;
                    else return false;
                },
                isSatisfied: function () {
                    if (($("#PWreq-PW").val().match(/[A-Z]/g) || []).length >= s.useUppercase) return true;
                    else if (s.useUppercase === -1 && ($("#PWreq-PW").val().match(/[A-Z]/g) || []).length >= Math.abs(s.useUppercase)) return true;
                    else return false;
                },
                explainText: function () {
                    if (s.useUppercase > 0) {
                        return `Großbuchstaben: mindestens ${s.useUppercase}`;
                    } else if (s.useUppercase < 0) {
                        return `Großbuchstaben`;
                    }
                },
                displayType: function () {
                    return s.uppercaseDisplayType;
                },
                lessText: function () {
                    if (s.useUppercase > 0) {
                        return `Großbuchstaben: mindestens ${s.useUppercase}`;
                    } else if (s.useUppercase < 0) {
                        return `Großbuchstaben`;
                    }
                },
                advancedText: function () {
                    if (s.useUppercase > 0) {
                        return `Großbuchstaben: mindestens ${($("#PWreq-PW").val().match(/[A-Z]/g) || []).length} / ${s.useUppercase}`;
                    } else if (s.useUppercase < 0) {
                        return `Großbuchstaben`;
                    }
                },
                name: 'uppercase'
            };
            var numbers = {
                isActive: function () {
                    if (s.useNumbers !== 0) return true;
                    else return false;
                },
                isSatisfied: function () {
                    if (($("#PWreq-PW").val().match(/[0-9]/g) || []).length >= s.useNumbers) return true;
                    else if (s.useNumbers === -1 && ($("#PWreq-PW").val().match(/[0-9]/g) || []).length >= Math.abs(s.useNumbers)) return true;
                    else return false;
                },
                explainText: function () {
                    if (s.useNumbers > 0) {
                        return `Ziffern: mindestens ${s.useNumbers}`;
                    } else if (s.useNumbers < 0) {
                        return `Ziffern`;
                    }
                },
                displayType: function () {
                    return s.numbersDisplayType;
                },
                lessText: function () {
                    if (s.useNumbers > 0) {
                        return `Ziffern: mindestens ${s.useNumbers}`;
                    } else if (s.useNumbers < 0) {
                        return `<li class="PWreq-item ${this.name}">Ziffern</li>`;
                    }
                },
                advancedText: function () {
                    if (s.useNumbers > 0) {
                        return `Ziffern: mindestens ${($("#PWreq-PW").val().match(/[0-9]/g) || []).length} / ${s.useNumbers}`;
                    } else if (s.useNumbers < 0) {
                        return `Ziffern`;
                    }
                },
                name: 'numbers'
            }
            var special = {
                isActive: function () {
                    if (s.useSpecial !== 0) return true;
                    else return false;
                },
                isSatisfied: function () {
                    if (($("#PWreq-PW").val().match(/[+\-*?^$.[\]{}()|/=!°:§%&<>~€@,#]/g) || []).length >= Math.abs(s.useSpecial)) return true;
                    else if (s.useSpecial === -1 && ($("#PWreq-PW").val().match(/[+\-*?^$.[\]{}()|/=!°:§%&<>~€@,#]/g) || []).length >= Math.abs(s.useSpecial)) return true;
                    else return false;
                },
                explainText: function () {
                    if (s.useSpecial > 0) {
                        return `Sonderzeichen: mindestens ${s.useSpecial}`;
                    } else if (s.useSpecial < 0) {
                        return `Sonderzeichen`;
                    }
                },
                displayType: function () {
                    return s.specialDisplayType;
                },
                lessText: function () {
                    if (s.useSpecial > 0) {
                        return `Sonderzeichen: mindestens ${s.useSpecial}`;
                    } else if (s.useSpecial < 0) {
                        return `Sonderzeichen`;
                    }
                },
                advancedText: function () {
                    if (s.useSpecial > 0) {
                        return `Sonderzeichen: mindestens ${($("#PWreq-PW").val().match(/[+\-*?^$.[\]{}()|/=!°:§%&<>~€@,#]/g) || []).length} / ${s.useSpecial}`;
                    } else if (s.useSpecial < 0) {
                        return `Sonderzeichen`;
                    }
                },
                name: 'special'
            }

            var settingsArray = [
                lowercase,
                uppercase,
                numbers,
                special
            ];

            var displayTypeArray = [
                minCharacter,
                maxCharacter,
                lowercase,
                uppercase,
                numbers,
                special
            ];

            // build hintText
            if (s.reqExplain === true) {
                var textString = "Verwenden Sie";
                var active = 0;
                for (h of settingsArray) {
                    // collecting all active settings
                    if (h.isActive()) {
                        active++;
                    }
                }

                var notActive = 0;
                for (t of settingsArray) {
                    if (!t.isActive()) continue;
                    notActive++;
                    if (notActive > 1) {
                        if (notActive < active) {
                            textString = `${textString}, ${t.explainText()}`;
                        } else if (notActive === active) {
                            textString = `${textString} und ${t.explainText()}.`;
                        }
                    } else {
                        textString = `${textString} ${t.explainText()}`;
                    }
                }

                var explanation = [
                    characters
                ];

                var characterText = "";
                for (i of explanation) {
                    if (i.name == "characters") {
                        characterText = i.explainText();
                    }
                }
                $(".PWreq-Explanation").text(characterText + textString);
                //$(".PWreq-Explanation .others").text(textString);
            }

            // build checklist
            for (c of displayTypeArray) {
                // collecting all active settings
                if (c.isActive()) {
                    if (c.displayType() === "less") {
                        $(".PWreq-checklist").append(`<li class="PWreq-item ${c.name}">${c.lessText()}</li>`)
                    } else if (c.displayType() === "advanced") {
                        $(".PWreq-checklist").append(`<li class="PWreq-item ${c.name}">${c.advancedText()}</li>`)
                    }
                }
            }

            // prevent submitting form as default --> gets overwritten as all requirements are met
            $("#PWreq-form").on("click", function (event) {
                event.preventDefault();
            });

            // update checklist
            $("#PWreq-PW").on("input", function (event) {
                for (u of displayTypeArray) {
                    if (u.isActive()) {
                        if (u.displayType() === "less") {
                            $(`.PWreq-item.` + `${u.name}`).text(u.lessText());
                        } else if (u.displayType() === "advanced") {
                            $(`.PWreq-item.` + `${u.name}`).text(u.advancedText());
                        }

                        if (u.isSatisfied()) {
                            $(`.PWreq-item.` + `${u.name}`).addClass("satisfied");
                        } else {
                            $(`.PWreq-item.` + `${u.name}`).removeClass("satisfied");
                        }
                    }
                }

                if ($(".PWreq-item.satisfied").length === $(".PWreq-item").length) {
                    $("#PWreq-form").off("click", function (event) {
                    });
                    setTimeout(function () {
                        $("#PWreq").fadeOut(s.fadeTime);
                    }, 500);
                } else {
                    $("#PWreq").fadeIn(s.fadeTime);
                    $("#PWreq-form").on("click", function (event) {
                        event.preventDefault();
                    });
                }
            });
        });
    }
}(jQuery));