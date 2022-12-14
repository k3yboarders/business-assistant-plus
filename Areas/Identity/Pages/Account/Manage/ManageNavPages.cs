// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

#nullable disable

using Microsoft.AspNetCore.Mvc.Rendering;

namespace CMP.Areas.Identity.Pages.Account.Manage;

/// <summary>
///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
///     directly from your code. This API may change or be removed in future releases.
/// </summary>
public static class ManageNavPages
{
    /// <summary>
    ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
    ///     directly from your code. This API may change or be removed in future releases.
    /// </summary>
    public static string Index => "Index";

    /// <summary>
    ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
    ///     directly from your code. This API may change or be removed in future releases.
    /// </summary>
    public static string Email => "Email";

    /// <summary>
    ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
    ///     directly from your code. This API may change or be removed in future releases.
    /// </summary>
    public static string ChangePassword => "ChangePassword";

    /// <summary>
    ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
    ///     directly from your code. This API may change or be removed in future releases.
    /// </summary>
    public static string DownloadPersonalData => "DownloadPersonalData";

    /// <summary>
    ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
    ///     directly from your code. This API may change or be removed in future releases.
    /// </summary>
    public static string DeletePersonalData => "DeletePersonalData";

    /// <summary>
    ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
    ///     directly from your code. This API may change or be removed in future releases.
    /// </summary>
    public static string ExternalLogins => "ExternalLogins";

    /// <summary>
    ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
    ///     directly from your code. This API may change or be removed in future releases.
    /// </summary>
    public static string PersonalData => "PersonalData";

    /// <summary>
    ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
    ///     directly from your code. This API may change or be removed in future releases.
    /// </summary>
    public static string TwoFactorAuthentication => "TwoFactorAuthentication";
    public static string Profile => "Profile";
    public static string Chart => "Chart";
    public static string Calculator => "Calculator";

    /// <summary>
    ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
    ///     directly from your code. This API may change or be removed in future releases.
    /// </summary>
    public static string IndexNavClass(ViewContext viewContext)
    {
        return PageNavClass(viewContext, Index);
    }
    public static string ProfileNavClass(ViewContext viewContext)
    {
        return PageNavClass(viewContext, Profile);
    }
    public static string ChartNavClass(ViewContext viewContext)
    {
        return PageNavClass(viewContext, Chart);
    }   
    public static string CalculatorNavClass(ViewContext viewContext)
    {
        return PageNavClass(viewContext, Calculator);
    }
    public static string EmailNavClass(ViewContext viewContext)
    {
        return PageNavClass(viewContext, Email);
    }
    public static string ChangePasswordNavClass(ViewContext viewContext)
    {
        return PageNavClass(viewContext, ChangePassword);
    }
    public static string DownloadPersonalDataNavClass(ViewContext viewContext)
    {
        return PageNavClass(viewContext, DownloadPersonalData);
    }
    public static string DeletePersonalDataNavClass(ViewContext viewContext)
    {
        return PageNavClass(viewContext, DeletePersonalData);
    }
    public static string ExternalLoginsNavClass(ViewContext viewContext)
    {
        return PageNavClass(viewContext, ExternalLogins);
    }
    public static string PersonalDataNavClass(ViewContext viewContext)
    {
        return PageNavClass(viewContext, PersonalData);
    }
    public static string TwoFactorAuthenticationNavClass(ViewContext viewContext)
    {
        return PageNavClass(viewContext, TwoFactorAuthentication);
    }
    public static string PageNavClass(ViewContext viewContext, string page)
    {
        var activePage = viewContext.ViewData["ActivePage"] as string
                         ?? Path.GetFileNameWithoutExtension(viewContext.ActionDescriptor.DisplayName);
        return string.Equals(activePage, page, StringComparison.OrdinalIgnoreCase) ? "active" : null;
    }
}