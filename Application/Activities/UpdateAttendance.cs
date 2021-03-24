using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id {get; set;}
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext _context;
        private readonly IUsernameAccessor _usernameAccessor;
            public Handler(DataContext context, IUsernameAccessor usernameAccessor)
            {
                _usernameAccessor = usernameAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .Include(a => a.Attendees)
                    .ThenInclude(u => u.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if(activity == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _usernameAccessor.GetUserName());

                if(user == null) return null;

                var HostUsername = activity.Attendees.FirstOrDefault(x=> x.IsHost)?.AppUser?.UserName;

                var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if(attendance != null && HostUsername == user.UserName)
                    activity.isCancelled = !activity.isCancelled;

                if(attendance != null && HostUsername != user.UserName)
                    activity.Attendees.Remove(attendance);

                if(attendance == null)
                {
                    attendance = new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = activity,
                        IsHost = false
                    };

                    activity.Attendees.Add(attendance);
                }

                var result = await _context.SaveChangesAsync() > 0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem Updating attendance");
                    
                
                
                
            }
        }
    }
}