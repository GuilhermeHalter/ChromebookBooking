using ChromebookBooking.Api.Domain.Common.Exceptions;

namespace ChromebookBooking.Api.Domain.ValueObjects;

public sealed class Email
{
    public string Value { get; private set; }

    private Email() { }

    private Email(string value)
    {
        Value = value;
    }

    public static Email Create(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            throw new DomainException("Email não pode ser vazio.");

        if (!IsValidEmail(email))
            throw new DomainException("Email inválido.");

        return new Email(email);
    }

    private static bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }
}
