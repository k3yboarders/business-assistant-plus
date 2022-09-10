// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
#nullable disable

using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using CMP.Models;
namespace CMP.Areas.Identity.Pages.Account.Manage
{
    public class IndexModel : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public IndexModel(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        ///
        public string Username { get; set; }

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        [TempData]
        public string StatusMessage { get; set; }

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        [BindProperty]
        public InputModel Input { get; set; }

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        public class InputModel
        {
            /// <summary>
            ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
            ///     directly from your code. This API may change or be removed in future releases.
            /// </summary>
            [Phone]
            [Display(Name = "Numer telefonu")]
            public string PhoneNumber { get; set; }
            [PersonalData]
            [Display(Name = "Imię")]
            public string FirstName { get; set; }
 
            [PersonalData]
            [Display(Name = "Nazwisko")]
            public string LastName { get; set; }
            [PersonalData]
            [Display(Name = "Sposób opodatkowania")]
            public int TaxationTypeId { get; set; }
            
            [PersonalData]
            [Display(Name = "Rodzaj dzialalności ")]
            public int TypeOfActivityId { get; set; }
            [PersonalData]
            [Display(Name = "Data urodzenia")]
            public DateTime? BirthDate { get; set; }
            [PersonalData]
            [Display(Name = "Faks")]
            public string? Fax { get; set; }
            [PersonalData]
            [Display(Name = "Motyw")]
            public int ThemeId { get; set; }

        }

        private async Task LoadAsync(ApplicationUser user)
        {
            var userName = await _userManager.GetUserNameAsync(user);
            var phoneNumber = await _userManager.GetPhoneNumberAsync(user);
            var firstName = user.FirstName;
            var lastName = user.LastName;
            var fax = user.Fax;
            var birthDate = user.BirthDate;
            var themeId = user.ThemeId;
            var typeOfActivityId = user.TypeOfActivityId;
            var taxationTypeId = user.TaxationTypeId;
            
            Username = userName;

            Input = new InputModel
            {
                PhoneNumber = phoneNumber,
                FirstName = firstName,
                LastName = lastName,
                Fax = fax,
                BirthDate = birthDate,
                ThemeId = themeId,
                TypeOfActivityId = typeOfActivityId,
                TaxationTypeId = taxationTypeId
                
            };
        }

        public async Task<IActionResult> OnGetAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Nie można załadować użytkownika o ID '{_userManager.GetUserId(User)}'.");
            }

            await LoadAsync(user);
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Nie można załadować użytkownika o ID '{_userManager.GetUserId(User)}'.");
            }

            if (!ModelState.IsValid)
            {
                await LoadAsync(user);
                return Page();
            }
            var phoneNumber = await _userManager.GetPhoneNumberAsync(user);
            if (Input.PhoneNumber != phoneNumber)
            {
                var setPhoneResult = await _userManager.SetPhoneNumberAsync(user, Input.PhoneNumber);
                if (!setPhoneResult.Succeeded)
                {
                    StatusMessage = "Błąd!.";
                    return RedirectToPage();
                }
            }

            if (Input.FirstName != user.FirstName)
            {
                user.FirstName = Input.FirstName;
                await _userManager.UpdateAsync(user);
            }
            if (Input.LastName != user.LastName)
            {
                user.LastName = Input.LastName;
                await _userManager.UpdateAsync(user);
            }
            if (Input.Fax != user.Fax)
            {
                user.Fax = Input.Fax;
                await _userManager.UpdateAsync(user);
            }
            if (Input.BirthDate != user.BirthDate)
            {
                user.BirthDate = Input.BirthDate;
                await _userManager.UpdateAsync(user);
            }
            if (Input.ThemeId != user.ThemeId)
            {
                user.ThemeId = Input.ThemeId;
                await _userManager.UpdateAsync(user);
            }            
            if (Input.TypeOfActivityId != user.TypeOfActivityId)
            {
                user.TypeOfActivityId = Input.TypeOfActivityId;
                await _userManager.UpdateAsync(user);
            }           
            if (Input.TaxationTypeId != user.TaxationTypeId)
            {
                user.TaxationTypeId = Input.TaxationTypeId;
                await _userManager.UpdateAsync(user);
            }
            await _signInManager.RefreshSignInAsync(user);
            StatusMessage = "Twój profil został zaktualizowany";
            return RedirectToPage();
        }
    }
}