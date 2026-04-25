using ChromebookBooking.Api.Domain.Common.Exceptions;
using ChromebookBooking.Api.Domain.ValueObjects;

namespace ChromebookBooking.Api.Domain.Services;

public static class EmailAccessPolicy
{
    public const string AllowedDomain = "@edu.joinville.sc.gov.br";

    public static void EnsureIsAllowed(Email email, string[] allowedBypassEmails)
    {
        if (allowedBypassEmails.Contains(email.Value, StringComparer.OrdinalIgnoreCase))
            return;

        if (!email.Value.EndsWith(AllowedDomain, StringComparison.OrdinalIgnoreCase))
            throw new DomainException($"Apenas e-mails do domínio '{AllowedDomain}' são permitidos.");
    }
}
